import React from 'react';
import 'tailwindcss/tailwind.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useAllProductsQuery } from "../redux/api/productApiSlice";
import ChatBot from '../ChatBot/ChatBot'; // Correct path to import ChatBot

const Carousel = () => {
  const { data: products, isError, isLoading } = useAllProductsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="my-8">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
      >
        {products.slice(0, 5).map((product, index) => (
          <SwiperSlide key={index} className="flex flex-col items-center">
            <img src={product.image} alt={product.name} className="w-200 h-64 object-cover" />
            <div className="mt-4 text-center">
              <p className="text-gray-700 font-semibold">{product.description}</p>
              <span className="text-red-600 text-xl">Rs.{product.sellingPrice}.00</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default function Home() {
  const { data: products, isError, isLoading } = useAllProductsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;  

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* New Cart Button */}
      <div className="flex justify-end mr-20 mt-4">
          <button
            onClick={() => window.location.href = '/cart'}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
            Go to Cart
          </button>
        </div>

      <main className="container mx-auto p-4">
        <div className="text-center mt-8">
          <h1 className="text-5xl font-bold">NEW ARRIVAL!</h1>
        </div>

        

        {/* Carousel Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <Carousel />
        </section>

        {/* Products Display - 4x3 Grid */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8">Products</h2>
          <div className="grid grid-cols-4 gap-6">
            {products.slice(0, 12).map((product, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                <img src={product.image} alt={product.name} className="w-full h-48 object-contain mb-4"/>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <span className="ml-4 text-2xl font-bold text-red-600">Rs.{product.sellingPrice}.00</span>
                <div className="mt-4 flex justify-between">
                  <button 
                    onClick={() => window.location.href = `/product/${product._id}`}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500">View</button>
                  <button 
                    onClick={() => window.location.href = `/product/${product._id}`}
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => window.location.href = '/productlist'}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">View All Products</button>
          </div>
        </section>
      </main>

      <ChatBot /> {/* ChatBot component is embedded here */}
    </div>
  );
}
