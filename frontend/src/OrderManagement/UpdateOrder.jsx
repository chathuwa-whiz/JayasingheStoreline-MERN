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

    const [orderId, setId] = useState('');
    const [itemsPrice, setItemsPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [status, setStatus] = useState('');

    const navigate = useNavigate();

    const [updateOrder] = useUpdateOrderMutation();
    const [deleteOrder] = useDeleteOrderMutation();

    useEffect(() => {
        if (orderData) {
            setId(orderData.orderId);
            setItemsPrice(orderData.itemsPrice);
            setDiscount(orderData.discount);
            setTotalPrice(orderData.totalPrice);
            setStatus(orderData.status);
        }
    }, [orderData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const updateData = {
                orderId,
                itemsPrice,
                discount,
                totalPrice,
                status
            };
            
            const result = await updateOrder({ orderId: params._id, ...updateData });
    
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
                    navigate("/order/orderhistory");
                }, 2000);
            }
        } catch (err) {
            console.log(err);
            toast.error("Delete failed. Try again.");
        }
    };

    return (
        <div className="p-8 grid grid-cols-2 gap-10">
            <div className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Order Information</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Order Name</label>
                    <input
                        type="text"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter Order name"
                        value={orderId}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Items Price</label>
                    <input
                        type="number"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter items price"
                        value={itemsPrice}
                        onChange={(e) => setItemsPrice(parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Discounted Amount</label>
                    <input
                        type="number"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter discount"
                        value={discount}
                        onChange={(e) => setDiscount(parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Total Price</label>
                    <input
                        type="number"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter total price"
                        value={totalPrice}
                        onChange={(e) => setTotalPrice(parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Order Status</label>
                    <input
                        type="text"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Change order status here"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </div>
            </div>

            <div className="col-span-2 flex justify-end space-x-4">
                <button
                    onClick={handleDelete}
                    className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                >
                    Delete
                </button>
                <button 
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                    Update Order Details
                </button>
            </div>
        </div>
    )
}
