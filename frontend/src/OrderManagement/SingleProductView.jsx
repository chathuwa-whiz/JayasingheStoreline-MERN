import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import { useGetProductByIdQuery } from "../redux/api/productApiSlice";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import {addToCart} from "../redux/features/cart/cartSlice";

export default function SingleProductView() {

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
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            setImage(productData.image);
        }
        
    }, [productData]);

    const newPrductPrice = (sellingPrice - (sellingPrice * discount) / 100).toFixed(2);

    const addToCartHandler = () => {
        dispatch(addToCart({...productData, qty}));
        navigate('/cart');
    }

    return (
        <div className="container mx-auto p-6">
            {/* Product Details Wrapper */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="flex justify-center">
                    <img
                        src={image}
                        alt="Product"
                        className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                </div>

                {/* Product Details */}
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">{name}</h1>
                    <p className="mt-2 text-gray-600">Category: {category}</p>
                    
                    <div className="mt-4">
                        <p className="text-xl font-semibold text-gray-900">Rs. {newPrductPrice}.00</p>
                        <p className="mt-2 text-sm text-gray-500 line-through">Rs. {sellingPrice}.00</p>
                        <p className="mt-1 text-sm text-green-600">Discount: {discount}% Off</p>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-700">{description}</h2>
                        <p className="mt-2 text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                        </p>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-700">Product Specifications</h2>
                        <ul className="mt-2 text-gray-600 list-disc list-inside">
                            <li>Feature 1: Lorem ipsum dolor sit amet</li>
                            <li>Feature 2: Consectetur adipiscing elit</li>
                            <li>Feature 3: Sed do eiusmod tempor incididunt</li>
                        </ul>
                    </div>

                    <div className="mt-6 flex items-center space-x-4">
                        <input
                            type="number"
                            className="w-16 p-2 border rounded-lg text-center"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                        />
                        <button 
                            onClick={addToCartHandler}
                            disabled={quantity === 0}
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
