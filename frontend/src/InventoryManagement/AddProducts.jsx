import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation, useUploadProductImageMutation } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { toast } from "react-hot-toast";

export default function AddProducts() {
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [buyingPrice, setBuyingPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [sku, setSku] = useState('');
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reOrderQty, setReOrderQty] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

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

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("buyingPrice", buyingPrice);
      productData.append("sellingPrice", sellingPrice);
      productData.append("category", category);
      productData.append("countInStock", quantity);
      productData.append("reOrderQty", reOrderQty);
      productData.append("brand", brand);
      productData.append("sku", sku);
      productData.append("barcode", barcode);
      productData.append("discount", discount);

      const data = await createProduct(productData).unwrap();
      toast.success("Product created successfully.");
      navigate("/inventory");
    } catch (error) {
      console.error(error);
      toast.error("Product creation failed. Try again.");
    }
  };

  // Handle File Upload
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
    <div className="p-8 grid grid-cols-2 gap-10 bg-gray-100 rounded-lg shadow-lg">
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
          {imageUrl && (
            <div className="mt-4">
              <img src={imageUrl} alt="Product" className="max-h-40 object-contain mx-auto shadow-md rounded" />
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
                <option key={cat._id} value={cat.name}>{cat.name}</option>
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

      {/* Other Details */}
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
        <button
          className="mt-6 w-full bg-orange-600 text-white py-3 rounded-lg shadow-lg hover:bg-orange-500 transition duration-200"
          onClick={handleSubmit}
        >
          Add Product
        </button>
      </div>
    </div>
  );
}
