import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import { useGetProductByIdQuery } from "../redux/api/productApiSlice";
import {useFetchCategoriesQuery} from "../redux/api/categoryApiSlice";
import toast from "react-hot-toast";

export default function ProductPage() {

  const params = useParams();

  const {data: productData} = useGetProductByIdQuery(params._id);
  
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

  const { data: categories = [] } = useFetchCategoriesQuery();

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

  console.log(productData);
  
  // State to keep track of the selected image
  const [selectedImage, setSelectedImage] = useState("uploads/products/sofa2.png");

  // Array of image URLs

  const images = [
    "uploads/products/sofa.jpg",
    "uploads/products/sofa2.png",
    "uploads/products/sofa3.avif",
    "uploads/products/sofa4",
    "uploads/products/sofa2.png",
  ];

  return (
    <div className="flex flex-col md:flex-row p-6">
      {/* Left Section: Product Image */}
      <div className="md:w-1/2">
        <img
          src={selectedImage}
          alt="Product"
          className="w-full h-96 object-cover rounded-lg"
        />

        {/* Thumbnail Images */}
        <div className="flex mt-4 space-x-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${selectedImage === image ? 'border-2 border-red-500' : ''}`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>

      {/* Right Section: Product Details */}
      <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
        <h1 className="text-3xl font-bold text-gray-800">Modern Luxury Sofa</h1>
        <p className="text-lg text-gray-600 line-through mt-2">LKR120,000.00</p>
        <p className="text-4xl font-bold text-red-500">LKR72,000.00</p>
        <p className="text-sm text-green-500 mt-2">40% off</p>
        
        <div className="flex items-center mt-4">
          <span className="text-yellow-500 text-xl">★★★★☆</span>
          <span className="text-gray-600 text-sm ml-2">4.8 (320 Reviews)</span>
        </div>

        <p className="text-gray-700 mt-6">
          This modern luxury sofa is crafted with premium materials, offering both comfort and style for your living space.
        </p>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Color Options:</h3>
          <div className="flex mt-2 space-x-2">
            {/* Color Options */}
            <button className="w-12 h-12 bg-gray-700 border rounded-lg"></button>
            <button className="w-12 h-12 bg-beige-300 border rounded-lg"></button>
            <button className="w-12 h-12 bg-navy-500 border rounded-lg"></button>
            <button className="w-12 h-12 bg-maroon-500 border rounded-lg"></button>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Dimensions:</h3>
          <p className="mt-2 text-gray-800">Width: 200cm, Depth: 90cm, Height: 85cm</p>
        </div>

        <div className="mt-6 flex items-center">
          <label htmlFor="quantity" className="mr-4 text-lg font-semibold">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="50"
            className="w-16 p-2 border rounded-lg text-center"
          />
        </div>

        <div className="mt-6 flex space-x-4">
          <button className="flex-1 bg-red-500 text-white py-3 rounded-lg text-lg hover:bg-red-600">
            Buy Now
          </button>
          <button className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg text-lg hover:bg-gray-300">
            Add to Cart
          </button>
        </div>

        <div className="mt-6 flex space-x-4">
          <button className="flex-1 text-gray-800 py-3 rounded-lg text-lg hover:bg-gray-100">
            <i className="fas fa-heart"></i> Add to Wishlist
          </button>
          <button className="flex-1 text-gray-800 py-3 rounded-lg text-lg hover:bg-gray-100">
            <i className="fas fa-share-alt"></i> Share
          </button>
        </div>
      </div>
    </div>
  );
}
