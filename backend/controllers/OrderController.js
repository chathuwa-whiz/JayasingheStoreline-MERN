import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js";

// Add new Order
export const addOrder = async (req, res) => {
    try {
        const { itemsPrice, deliveryPrice, discount, totalPrice, status, orderItems } = req.fields;

        // Validate required fields
        switch (true) {
            case !itemsPrice:
                return res.json({ error: "itemsPrice is required" });
            case !deliveryPrice:
                return res.json({ error: "deliveryPrice is required" });
            case !discount:
                return res.json({ error: "discount is required" });
            case !totalPrice:
                return res.json({ error: "totalPrice is required" });
            case !status:
                return res.json({ error: "status is required" });
        }

        // Step 1: Count the number of existing orders to generate a sequential orderId
        const orderCount = await Order.countDocuments();
        const orderId = `OID${orderCount + 1}`;

        // Step 2: Ensure that orderItems is parsed correctly into an array (if it's a string)
        let items;
        try {
            items = JSON.parse(orderItems); // Ensure you parse this string into an array of objects
        } catch (error) {
            return res.status(400).json({ error: "Invalid orderItems format" });
        }

        // Step 3: Create a new order with the parsed orderItems array
        const order = new Order({
            itemsPrice,
            deliveryPrice,
            discount,
            totalPrice,
            status,
            orderItems: items, // Store it as an array
            orderId, // Add the new orderId
            ...req.fields // Additional fields like customer details
        });

        // Save the order to the database
        await order.save();

        // Step 4: Update product quantities for each order item
        for (const item of items) {
            const product = await Product.findById(item._id);
            if (!product) {
                return res.status(404).json({ error: `Product with ID ${item._id} not found` });
            }

            // Adjust stock quantity logic
            if (product.currentQty <= 0) {
                product.currentQty = product.countInStock;
            }
            product.currentQty -= item.qty;
            await product.save();
        }

        // Return success response with order details
        res.status(201).json({ msg: "Order Added Successfully", orderId, items });

    } catch (error) {
        res.status(400).json({ msg: "Order Adding Failed", error });
    }
};



// fetch all orders
// export const fetchOrders = async (req, res) => {
//     try {
//         const orders = await Order.find();
//         res.json(orders);
//     } catch (error) {
//         res.status(400).json( { msg : "No Order Found", error } );
//     }
// }

export const fetchOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        orders.forEach(order => {
            if (typeof order.orderItems === 'string') {
                order.orderItems = JSON.parse(order.orderItems);
            }
        });
        res.json(orders);
    } catch (error) {
        res.status(400).json({ msg: "No Order Found", error });
    }
};



// fetch a product by id
export const fetchOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(!order) {
            return res.status(404).json( { msg : "Product Not Found" } );
        }
        res.json(order);
    } catch (error) {
        res.status(404).json( { msg : "Cannot find this product", error } );
    }
}

// update product
// update order including order items and quantities
export const updateOrder = async (req, res) => {
    try {
        const { itemsPrice, deliveryPrice, discount, totalPrice, status, orderItems } = req.fields;

        // Validate required fields
        // switch (true) {
        //     case !itemsPrice:
        //         return res.json({ error: "itemsPrice is required" });
        //     case !deliveryPrice:
        //         return res.json({ error: "deliveryPrice is required" });
        //     case !discount:
        //         return res.json({ error: "discount is required" });
        //     case !totalPrice:
        //         return res.json({ error: "totalPrice is required" });
        //     case !status:
        //         return res.json({ error: "status is required" });
        // }

        // Ensure orderItems is an array of objects
        let items;
        try {
            items = JSON.parse(orderItems); // Parse orderItems into an array if necessary
        } catch (error) {
            return res.status(400).json({ error: "Invalid orderItems format" });
        }

        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }

        // Update stock quantities for each product in the order
        for (const item of items) {
            const product = await Product.findById(item._id);
            if (!product) {
                return res.status(404).json({ error: `Product with ID ${item._id} not found` });
            }

            // Adjust stock quantity based on the new quantities
            const originalItem = order.orderItems.find(orderItem => orderItem._id.toString() === item._id.toString());
            const qtyDifference = item.qty - (originalItem ? originalItem.qty : 0); // Calculate the difference in quantity

            if (product.currentQty + qtyDifference < 0) {
                return res.status(400).json({ error: `Not enough stock for product ${product.name}` });
            }

            product.currentQty += qtyDifference;
            await product.save();
        }

        // Update the order details
        order.itemsPrice = itemsPrice;
        order.deliveryPrice = deliveryPrice;
        order.discount = discount;
        order.totalPrice = totalPrice;
        order.status = status;
        order.orderItems = items;

        await order.save();
        res.json({ msg: "Update Successful", order });
    } catch (error) {
        res.status(400).json({ msg: "Update Failed", error });
    }
};


// delete product
export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if(!order) {
            return res.status(400).json( { msg : "Order not found" } )
        }
        res.json( { msg : "Order Deleted Successfully" } )
    } catch (error) {
        res.status(400).json( { msg : "Order Cannot Delete ", error } );
    }
}