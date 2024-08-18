import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useCreateProductMutation,  useUploadProductImageMutation} from "../redux/api/productApiSlice";
import {useFetchCategoriesQuery} from "../redux/api/categoryApiSlice";
import {toast} from "react-toastify";

export default function AddProducts() {

    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [buyingPrice, setBuyingPrice] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [sku, setSku] = useState('');
    const [barcode, setBarcode] = useState('');
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate();

    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();
    const { data: categories } = useFetchCategoriesQuery();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const productData = new FormData();
          productData.append("image", image);
          productData.append("name", name);
          productData.append("description", description);
          productData.append("buyingPrice", buyingPrice);
          productData.append("sellingPrice", sellingPrice);
          productData.append("category", category);
          productData.append("quantity", quantity);
          productData.append("brand", brand);
          productData.append("sku", sku);
          productData.append("barcode", barcode);
          productData.append("discount", discount);
    
          const { data } = await createProduct(productData);
    
          if (data.error) {
            toast.error("Product create failed. Try Again.");
          } else {
            toast.success(`${data.name} is created`);
            navigate("/");
          }
        } catch (error) {
          console.error(error);
          toast.error("Product create failed. Try Again.");
        }
      };
    
      const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
    
        try {
          const res = await uploadProductImage(formData).unwrap();
          toast.success(res.message);
          setImage(res.image);
          setImageUrl(res.image);
        } catch (error) {
          toast.error(error?.data?.message || error.error);
        }
      };

  return (
    <div className="p-8 grid grid-cols-2 gap-10">
        {/* General Information */}
        <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">General Information</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Product Name</label>
                <input
                    type="text"
                    className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label className="block text-gray-700">Description</label>
                <textarea
                    className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                    rows="4"
                    placeholder="Enter product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
        </div>

        {/* Product Media */}
        <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Product Media</h2>
            <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg bg-blue-50">
                <p className="mb-2">Photo Product</p>
                <input 
                    type="file" 
                    onChange={uploadFileHandler} 
                    className="px-4 py-2 border rounded-lg text-blue-500 border-blue-500"
                />
                {imageUrl && (
                    <div className="mt-4">
                        <img src={imageUrl} alt="Product" className="max-h-40 object-contain mx-auto" />
                    </div>
                )}
            </div>
        </div>

        {/* Pricing */}
        <div className="border rounded-lg p-4 col-span-1">
            <h2 className="text-xl font-semibold mb-4">Pricing</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700">Buying Price</label>
                    <input
                        type="number"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter buying price"
                        value={buyingPrice}
                        onChange={(e) => setBuyingPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Selling Price</label>
                    <input
                        type="number"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter selling price"
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(e.target.value)}
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-700">Discount Percentage (%)</label>
                    <input
                        type="number"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter discount percentage"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                    />
                </div>
            </div>
        </div>

        {/* Category */}
        <div className="border rounded-lg p-4 col-span-1">
            <h2 className="text-xl font-semibold mb-4">Category</h2>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-gray-700">Product Category</label>
                    <select
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        {categories?.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700">Brand Name</label>
                    <input
                        type="text"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter product brand name"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </div>
            </div>
        </div>

        {/* Inventory */}
        <div className="border rounded-lg p-4 col-span-2">
            <h2 className="text-xl font-semibold mb-4">Inventory</h2>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-gray-700">SKU</label>
                    <input
                        type="text"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter SKU"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Barcode</label>
                    <input
                        type="text"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter barcode"
                        value={barcode}
                        onChange={(e) => setBarcode(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Quantity</label>
                    <input
                        type="number"
                        className="w-full p-2 mt-1 border rounded-lg bg-blue-50"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="col-span-2 flex justify-end space-x-4">
            <button 
                type="button" 
                className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                onClick={() => navigate("/")}
            >
                Discard Changes
            </button>
            <button 
                type="submit" 
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
                Add Product
            </button>
        </div>
    </div>
  )
}
