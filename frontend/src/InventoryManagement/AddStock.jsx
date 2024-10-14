import React, { useState } from 'react';
import { useGetProductByIdQuery, useUpdateOneProductMutation } from '../redux/api/productApiSlice';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';

export default function AddStockPage() {

    const params = useParams();

    const { data: products, isLoading, isError } = useGetProductByIdQuery(params._id);
    const [updateProduct] = useUpdateOneProductMutation();

    // console.log(products);

    const [quantity, setQuantity] = useState(0);
    const [purchasePrice, setPurchasePrice] = useState('');
    const [reOrderQty, setReorderQty] = useState('');

    const handleAddStock = async (e) => {
        e.preventDefault();

        // Validate form
        if (!quantity || !purchasePrice || !reOrderQty) {
            toast.error('Please fill in all fields');
            return;
        }
        setQuantity(0);
        setPurchasePrice('');
        setReorderQty('');

        try {
            const data = await updateProduct({
                productId: products._id,
                quantity: parseInt(quantity) + products.countInStock,
                purchasePrice,
                reOrderQty,
            });
            if(data.error) {
                toast.error('Failed to update stock');
                return;
            }
            toast.success('Stock updated successfully!');
            setTimeout(() => {
                toast.dismiss();
                window.location.href = "/inventory/stock";

            }, 2000);
            
        } catch (error) {
            toast.error('Failed to update stock');
        }
    };
    

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Something went wrong</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-center mb-6">Add New Stock</h2>
                <form onSubmit={handleAddStock} className="space-y-4">
                    {/* Product Selection */}
                    <div>
                        <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-2">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="supplier"
                            value={products.name}
                            className="w-full p-3 border rounded bg-gray-50"
                            placeholder="Product name"
                            disabled
                        />
                    </div>

                    {/* Quantity */}
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full p-3 border rounded bg-gray-50"
                            placeholder="Enter quantity"
                        />
                    </div>

                    {/* Purchase Price */}
                    <div>
                        <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700 mb-2">
                            Purchase Price
                        </label>
                        <input
                            type="number"
                            id="purchasePrice"
                            value={purchasePrice}
                            onChange={(e) => setPurchasePrice(e.target.value)}
                            className="w-full p-3 border rounded bg-gray-50"
                            placeholder="Enter purchase price"
                        />
                    </div>

                    {/* Reorder Quantity */}
                    <div>
                        <label htmlFor="reOrderQty" className="block text-sm font-medium text-gray-700 mb-2">
                            Reorder Quantity
                        </label>
                        <input
                            type="number"
                            id="reOrderQty"
                            value={reOrderQty}
                            onChange={(e) => setReorderQty(e.target.value)}
                            className="w-full p-3 border rounded bg-gray-50"
                            placeholder="Enter Reorder Quantity"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600 transition duration-200"
                        >
                            Add Stock
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
