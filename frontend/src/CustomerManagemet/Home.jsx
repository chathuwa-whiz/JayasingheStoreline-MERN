import React from 'react';
import 'tailwindcss/tailwind.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import {useLocation} from 'react-router-dom'
// import 'swiper/modules/autoplay/autoplay.min.css'; // Import the autoplay styles
import { Autoplay } from 'swiper/modules'; // Import Autoplay directly

// Importing images
import iphone from '../../../uploads/customerManagement/iphone.jpeg';
import riceCooker from '../../../uploads/customerManagement/rice cooker.jpeg';
import airFryer from '../../../uploads/customerManagement/airfryer.jpeg';
import airCon from '../../../uploads/customerManagement/aircon.jpeg';
import bed from '../../../uploads/customerManagement/bed.jpeg';
import blender from '../../../uploads/customerManagement/blender.jpeg';
import macbook from '../../../uploads/customerManagement/macbook.jpeg';
import tv from '../../../uploads/customerManagement/TVLIFE.jpg';
import table from '../../../uploads/customerManagement/table.jpg';

const Carousel = () => {
  const items = [
    {
      img: macbook,
      text: 'Comfortable Sofa',
      price: 'RS 20000'
    },
    {
      img: iphone,
      text: 'Wooden Cupboard',
      price: 'RS 15000'
    },
    {
      img: 'https://hips.hearstapps.com/hmg-prod/images/wu4719microwavewithgrill-01-pcm155026-1574424415.jpg',
      text: 'Microwave Oven',
      price: 'RS 10000'
    },
    {
      img: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/4Coffee_Table.jpg',
      text: 'Coffee Table',
      price: 'RS 8000'
    }
  ];

  return (
    <div className="my-8">
      <Swiper
        modules={[Autoplay]} // Pass the Autoplay module here
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{ delay: 2000, disableOnInteraction: false }} // Automatic sliding with 3-second delay
        loop={true}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="flex flex-col items-center">
            <img src={item.img} alt={item.text} className="w-200 h-64 object-cover" /> {/* Larger images */}
            <div className="mt-4 text-center">
              <p className="text-gray-700 font-semibold">{item.text}</p>
              <span className="text-red-600 text-xl">{item.price}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default function Home() {

  const location = useLocation()

  const products = [
    {
      img: 'https://cdn.thewirecutter.com/wp-content/media/2023/05/sofabuyingguide-2048px-benchmademoderncream.jpg',
      text: 'Comfortable Sofa',
      price: 'RS 20000'
    },
    {
      img: 'https://caspianfurniture.com/cdn/shop/products/6_c6556859-1142-43e0-a38e-d857f99b5209.png?v=1681899262',
      text: 'Wooden Cupboard',
      price: 'RS 15000'
    },
    {
      img: 'https://hips.hearstapps.com/hmg-prod/images/wu4719microwavewithgrill-01-pcm155026-1574424415.jpg',
      text: 'Microwave Oven',
      price: 'RS 10000'
    },
    {
      img: iphone,
      text: 'iPhone 13',
      description: 'Latest model with A15 Bionic chip.',
      price: 'RS 150000'
    },
    {
      img: riceCooker,
      text: 'Rice Cooker',
      description: 'Automatic rice cooker with multiple settings.',
      price: 'RS 3000'
    },
    {
      img: airFryer,
      text: 'Air Fryer',
      description: 'Healthy cooking with less oil.',
      price: 'RS 8000'
    },
    {
      img: airCon,
      text: 'Air Conditioner',
      description: 'Split AC with fast cooling technology.',
      price: 'RS 50000'
    },
    {
      img: bed,
      text: 'King Size Bed',
      description: 'Luxurious bed with memory foam mattress.',
      price: 'RS 25000'
    },
    {
      img: blender,
      text: 'Blender',
      description: 'High-speed blender for smoothies and more.',
      price: 'RS 5000'
    },
    {
      img: macbook,
      text: 'MacBook Pro',
      description: 'M1 chip with Retina display.',
      price: 'RS 200000'
    },
    {
      img: table,
      text: 'Table',
      description: 'Convection Table for even Dining.',
      price: 'RS 12000'
    },
    {
      img: tv,
      text: 'Smart TV',
      description: '55-inch 4K Ultra HD Smart TV.',
      price: 'RS 60000'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
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
            {products.map((product, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                <img src={product.img} alt={product.text} className="w-full h-48 object-contain mb-4"/>
                <h3 className="text-xl font-semibold">{product.text}</h3>
                <p className="text-gray-600">{product.description}</p>
                <span className="ml-4 text-2xl font-bold text-red-600">{product.price}</span>
                <div className="mt-4 flex justify-between">
                  <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500">View</button>
                  <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
