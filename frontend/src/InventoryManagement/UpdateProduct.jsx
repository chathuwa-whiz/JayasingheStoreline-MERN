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

    console.log(productData);
    
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
    const [reOrderQty, setReOrderQty] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const [uploadProductImage] = useUploadProductImageMutation();
    const { data: categories = [] } = useFetchCategoriesQuery();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

      // Validate Inputs
    const validateInputs = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Product name is required.";
        if (!description.trim()) newErrors.description = "Description is required.";
        if (buyingPrice <= 0) newErrors.buyingPrice = "Buying price must be greater than 0.";
        if (sellingPrice <= 0) newErrors.sellingPrice = "Selling price must be greater than 0.";
        if (discount < 0 || discount > 100) newErrors.discount = "Discount must be between 0 and 100.";
        if (!category) newErrors.category = "Category is required.";
        if (!quantity || quantity <= 0) newErrors.quantity = "Quantity must be greater than 0.";
        if (!reOrderQty || reOrderQty <= 0) newErrors.reOrderQty = "Reorder Quantity must be greater than 0.";
        if (!brand.trim()) newErrors.brand = "Brand is required.";
        if (!sku.trim()) newErrors.sku = "SKU is required.";
        if (!barcode.trim()) newErrors.barcode = "Barcode is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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
            setQuantity(productData.countInStock);
            setReOrderQty(productData.reOrderQty);
            setImage(productData.image);
        }
        
    }, [productData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateInputs()) {
            toast.error("Please correct the errors in the form.");
            return;
        }
    
        try {
          const formData = new FormData();
          formData.append("image", image);
          formData.append("name", name);
          formData.append("description", description);
          formData.append("buyingPrice", buyingPrice);
          formData.append("sellingPrice", sellingPrice);
          formData.append("category", category);
          formData.append("countInStock", quantity);
          formData.append("reOrderQty", reOrderQty);
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
        <div className="border rounded-lg p-4 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-orange-600">General Information</h2>

            <div className="mb-4">
            <label className="block text-gray-700 font-medium">Product Name</label>
            <input
                type="text"
                className={`w-full p-2 mt-1 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-blue-50 focus:ring-2 focus:ring-orange-500`}
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
                className={`w-full p-2 mt-1 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-blue-50 focus:ring-2 focus:ring-orange-500`}
                rows="4"
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

        </div>

        {/* Product Media */}
        <div className="border rounded-lg p-4 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-orange-600">Product Media</h2>
            <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg bg-blue-50">
            <p className="mb-2">Photo Product</p>
            <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="px-4 py-2 border rounded-lg text-blue-500 border-blue-500 cursor-pointer hover:bg-blue-100"
            />
            {image && (
                <div className="mt-4">
                <img src={image} alt="Product" className="max-h-40 object-contain mx-auto shadow-md rounded" />
                </div>
            )}
            </div>
        </div>

        {/* Pricing */}
        <div className="border rounded-lg p-4 col-span-1 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-orange-600">Pricing</h2>
            <div className="grid grid-cols-2 gap-4">

                <div>
                    <label className="block text-gray-700 font-medium">Buying Price</label>
                    <input
                    type="number"
                    className={`w-full p-2 mt-1 border ${errors.buyingPrice ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-blue-50 focus:ring-2 focus:ring-orange-500`}
                    placeholder="Enter buying price"
                    value={buyingPrice}
                    onChange={(e) => 
                        e.target.value >= 0 ? 
                        setBuyingPrice(e.target.value)
                        : setBuyingPrice(0)  // Ensure the value stays above 0
                    }
                    />
                    {errors.buyingPrice && <p className="text-red-500 text-sm mt-1">{errors.buyingPrice}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Selling Price</label>
                    <input
                    type="number"
                    className={`w-full p-2 mt-1 border ${errors.sellingPrice ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-blue-50 focus:ring-2 focus:ring-orange-500`}
                    placeholder="Enter selling price"
                    value={sellingPrice}
                    onChange={(e) => 
                        e.target.value >= 0 ? 
                        setSellingPrice(e.target.value)
                        : setSellingPrice(0)  // Ensure the value stays above 0
                    }
                    />
                    {errors.sellingPrice && <p className="text-red-500 text-sm mt-1">{errors.sellingPrice}</p>}
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700 font-medium">Discount Percentage (%)</label>
                    <input
                    type="number"
                    className={`w-full p-2 mt-1 border ${errors.discount ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-blue-50 focus:ring-2 focus:ring-orange-500`}
                    placeholder="Enter discount percentage"
                    value={discount}
                    min={0}
                    max={100}
                    onChange={(e) => setDiscount(Math.max(0, Math.min(100, Number(e.target.value))))}  // Ensure the value stays within 0 - 100
                    />
                    {errors.discount && <p className="text-red-500 text-sm mt-1">{errors.discount}</p>}
                </div>

            </div>
        </div>

        {/* Category */}
        <div className="border rounded-lg p-4 col-span-1 bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-orange-600">Category</h2>
            <div className="grid grid-cols-1 gap-4">

                <div>
                    <label className="block text-gray-700 font-medium">Category</label>
                    <select
                    className={`w-full p-2 mt-1 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-blue-50 focus:ring-2 focus:ring-orange-500`}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    >
                    <option value="" disabled>Select a category</option>
                    {categories?.map((cat) => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Quantity</label>
                    <input
                    type="number"
                    className={`w-full p-2 mt-1 border ${errors.quantity ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-blue-50 focus:ring-2 focus:ring-orange-500`}
                    placeholder="Enter product quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    />
                    {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Reorder Quantity</label>
                    <input
                    type="number"
                    className={`w-full p-2 mt-1 border ${errors.reOrderQty ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-blue-50 focus:ring-2 focus:ring-orange-500`}
                    placeholder="Enter re-order quantity"
                    value={reOrderQty}
                    onChange={(e) => setReOrderQty(e.target.value)}
                    />
                    {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.reOrderQty}</p>}
                </div>

            </div>
        </div>

        {/* Inventory */}
        <div className="border rounded-lg p-4 col-span-2 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-orange-600">Other Details</h2>
            <div className="grid grid-cols-3 gap-4">

                <div>
                    <label className="block text-gray-700 font-medium">Brand</label>
                    <input
                    type="text"
                    className={`w-full p-2 mt-1 border ${errors.brand ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-blue-50 focus:ring-2 focus:ring-orange-500`}
                    placeholder="Enter brand"
                    value={brand}
                    onKeyDown={(e) => {
                        if (!/^[a-zA-Z]+$/.test(e.key)) {
                        e.preventDefault();
                        }
                    }}
                    onChange={(e) => setBrand(e.target.value)}
                    />
                    {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">SKU</label>
                    <input
                    type="text"
                    className={`w-full p-2 mt-1 border ${errors.sku ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-blue-50 focus:ring-2 focus:ring-orange-500`}
                    placeholder="Enter SKU"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    />
                    {errors.sku && <p className="text-red-500 text-sm mt-1">{errors.sku}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Barcode</label>
                    <input
                    type="text"
                    className={`w-full p-2 mt-1 border ${errors.barcode ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-blue-50 focus:ring-2 focus:ring-orange-500`}
                    placeholder="Enter barcode"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    />
                    {errors.barcode && <p className="text-red-500 text-sm mt-1">{errors.barcode}</p>}
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
