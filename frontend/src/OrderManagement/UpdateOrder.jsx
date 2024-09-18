import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { 
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    useGetOrderByIdQuery
} from "../redux/api/orderApiSlice";
import toast from "react-hot-toast";

export default function UpdateOrders() {

    const params = useParams();
    const { data: orderData } = useGetOrderByIdQuery(params._id);

    console.log("Order Data: ", orderData);

    const [orderId, setId] = useState('');
    const [itemsPrice, setItemsPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [status, setStatus] = useState('Pending');
    const [orderItems, setItems] = useState([]);

    const navigate = useNavigate();

    const [updateOrder] = useUpdateOrderMutation();
    const [deleteOrder] = useDeleteOrderMutation();

    useEffect(() => {
        if (orderData) {
            setId(orderData.orderId || '');
            setItemsPrice(orderData.itemsPrice || 0);
            setDiscount(orderData.discount || 0);
            setTotalPrice(orderData.totalPrice || 0);
            setStatus(orderData.status || 'Pending');
            setItems(orderData.orderItems || []);
        }
    }, [orderData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isNaN(itemsPrice) || isNaN(discount) || isNaN(totalPrice)) {
            toast.error("Please enter valid numeric values for price and discount.");
            return;
        }
    
        try {
            const updateData = {
                orderId,
                itemsPrice,
                discount,
                totalPrice,
                status,
                orderItems
            };
            
            const result = await updateOrder({ orderId: params._id, ...updateData });
            
            console.log("Update Data: ", updateData);
            console.log("RESULT: ", result);
            
            if (result.error) {
                toast.error("Order update failed");  
            } else {
                toast.success(`Order successfully updated`);
                setTimeout(() => {
                    toast.dismiss();
                    navigate("/order/orderhistory");
                }, 2000);
            }
        } catch (error) {
            console.log("ERROR: ", error);
        }
    };

    const handleDelete = async () => {
        try {
            const answer = window.confirm("Are you sure you want to delete this order?");
            if (!answer) return;

            const result = await deleteOrder(params._id);

            if (result.error) {
                toast.error("Delete failed. Try again.");
            } else {
                toast.success(`Order deleted`);
                setTimeout(() => {
                    toast.dismiss();
                    window.location = "/order/orderhistory";
                }, 2000);
            }
        } catch (err) {
            console.log(err);
            toast.error("Delete failed. Try again.");
        }
    };

    return (
        <div className="p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-10">
                <div className="border rounded-lg  p-6 bg-gray-50">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Information</h2>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium">Order Name</label>
                        <input
                            type="text"
                            className="w-full mt-2 p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Enter Order name"
                            value={orderId}
                            onChange={(e) => setId(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium">Order Items</label>
                        <div className="w-full mt-2 p-3 border rounded-lg bg-white max-h-40 overflow-y-auto">
                            {orderItems && orderItems.length > 0 ? (
                                JSON.parse(orderItems).map((item, index) => (
                                    <div key={item._id} className="flex justify-between py-2 border-b last:border-b-0">
                                        {/* Input fields for item name */}
                                        <input 
                                            type="text" 
                                            className="w-full p-2 mr-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                                            value={item.name} 
                                            onChange={(e) => {
                                                const newOrderItems = JSON.parse(orderItems);
                                                newOrderItems[index].name = e.target.value;
                                                setItems(JSON.stringify(newOrderItems));
                                            }} 
                                        />
                                        
                                        {/* Input fields for item quantity */}
                                        <input 
                                            type="number" 
                                            className="w-16 p-2 ml-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                                            value={item.qty} 
                                            onChange={(e) => {
                                                const newOrderItems = JSON.parse(orderItems);
                                                newOrderItems[index].qty = e.target.value;
                                                setItems(JSON.stringify(newOrderItems));
                                            }} 
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No items found</p>
                            )}
                        </div>
                    </div>


                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium">Items Price</label>
                        <input
                            type="number"
                            className="w-full mt-2 p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Enter items price"
                            value={itemsPrice}
                            onChange={(e) => setItemsPrice(parseFloat(e.target.value) || 0)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium">Discounted Amount</label>
                        <input
                            type="number"
                            className="w-full mt-2 p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Enter discount"
                            value={discount}
                            onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium">Total Price</label>
                        <input
                            type="number"
                            className="w-full mt-2 p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Enter total price"
                            value={totalPrice}
                            onChange={(e) => setTotalPrice(parseFloat(e.target.value) || 0)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium">Order Status</label>
                        <select
                            className="w-full mt-2 p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>

                <div className="col-span-1 md:col-span-2 flex justify-end space-x-4 mt-6">
                    <button
                        onClick={handleDelete}
                        className="px-6 py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                    >
                        Delete
                    </button>
                    <button 
                        onClick={handleSubmit}
                        className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                    >
                        Update Order Details
                    </button>
                </div>
            </div>
        </div>
    );
}
