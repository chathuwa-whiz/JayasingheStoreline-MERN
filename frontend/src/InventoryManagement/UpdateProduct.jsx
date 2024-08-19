import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useUploadProductImageMutation
} from "../redux/api/productApiSlice";
import {useFetchCategoriesQuery} from "../redux/api/categoryApiSlice";
import toast from "react-hot-toast";

export default function UpdateProducts() {

    const params = useParams();

    const {data: productData} = useGetProductByIdQuery(params._id);

    console.log("Incoming Name : ",productData?.name);
    
    const [image, setImage] = useState(productData?.image);
    const [imageUrl, setImageUrl] = useState('');
    const [name, setName] = useState(productData?.name || '');
    const [description, setDescription] = useState(productData?.description || '');
    const [buyingPrice, setBuyingPrice] = useState(productData?.buyingPrice || 0);
    const [sellingPrice, setSellingPrice] = useState(productData?.sellingPrice || 0);
    const [discount, setDiscount] = useState(productData?.discount || 0);
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState(productData?.brand || '');
    const [sku, setSku] = useState(productData?.sku || '');
    const [barcode, setBarcode] = useState(productData?.barcode || '');
    const [quantity, setQuantity] = useState(productData?.quantity || 0);
    const navigate = useNavigate();

    const [uploadProductImage] = useUploadProductImageMutation();
    const { data: categories = [] } = useFetchCategoriesQuery();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    useEffect(() => {
        if(productData && productData._id) {
            setName(productData.name);
            setDescription(productData.description);
            setBuyingPrice(productData.buyingPrice);
            setSellingPrice(productData.sellingPrice);
            setDiscount(productData.discount);
            setCategory(productData.category);
            setBrand(productData.brand);
            setSku(productData.sku);
            setBarcode(productData.barcode);
            setQuantity(productData.quantity);
            setImage(productData.image);
        }
        
    }, [productData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const formData = new FormData();
          formData.append("image", image);
          formData.append("name", name);
          formData.append("description", description);
          formData.append("buyingPrice", buyingPrice);
          formData.append("sellingPrice", sellingPrice);
          formData.append("category", category);
          formData.append("countInStock", quantity);
          formData.append("brand", brand);
          formData.append("sku", sku);
          formData.append("barcode", barcode);
          formData.append("discount", discount);
          
          const data = await updateProduct({productId: params._id, formData});

          console.log(data.data.product.name);
          
    
          if (data?.error) {

            toast.error("Product update failed");  

          } else {

            toast.success(`Product successfully updated`);
            setTimeout(() => {
                toast.dismiss();
                window.location.href = "/inventory/products";

            }, 2000);

          }
        } catch (error) {
            console.log("ERROR: ",error);
        }
      };

      const handleDelete = async () => {
        try {
          let answer = window.confirm(
            "Are you sure you want to delete this product?"
          );
          if (!answer) return;
    
          const data = await deleteProduct(params._id);

          toast.success(`Product is deleted`);

          setTimeout(() => {
            toast.dismiss();
            window.location.href = "/inventory/products";
          }, 2000);

        } catch (err) {

          console.log(err);
          toast.error("Delete failed. Try again.");
        }
      };
    
      const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        try {

          const res = await uploadProductImage(formData).unwrap();
          toast.success("Item added successfully");
          setImage(res.image);

        } catch (err) {
          toast.success("Item added successfully");
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
                    name='image'
                    accept='image/*'
                    onChange={uploadFileHandler} 
                    className="px-4 py-2 border rounded-lg text-blue-500 border-blue-500"
                />
                {image && (
                    <div className="mt-4">
                        <img src={image} alt="Product" className="max-h-40 object-contain mx-auto" />
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
                onClick={handleDelete}
                className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
            >
                Delete
            </button>
            <button 
                onClick={handleSubmit}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
                Update Product
            </button>
        </div>
    </div>
  )
}
