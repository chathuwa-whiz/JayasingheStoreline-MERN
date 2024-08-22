import Order from "../models/Order";

// add new Order
export const addOrder = async (req, res) => {
    try {
        const { itemsPrice, deliveryPrice, discount, totalprice, status } = req.fields;
        
        switch(true) {
            case !itemsPrice:
                return res.json( { error: "Name is required" } );
            case !deliveryPrice:
                return res.json( { error: "Brand is required" } );
            case !discount:
                return res.json( { error: "Description is required" } );
            case !totalprice:
                return res.json( { error: "Category is required" } );
            case !status:
                return res.json( { error: "SKU is required" } );
           
        }
        
        const order = new Order({...req.fields});
        await order.save();
        res.status(201).json( { msg : "Order Added Successfully" } );
    } catch (error) {
        res.status(400).json( { msg : "Order Adding Failed ", error } );
    }
}

// fetch all orders
export const fetchOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(400).json( { msg : "No Order Found", error } );
    }
}
