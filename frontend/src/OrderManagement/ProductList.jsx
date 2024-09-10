import React from 'react';
import { Link } from 'react-router-dom';
import { useAllProductsQuery } from '../redux/api/productApiSlice';

export default function ProductsList() {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  console.log(products);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Something went wrong</div>;

  // Function to calculate the average rating for a product
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  // Function to render stars based on the rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Full stars (★)
    const halfStar = rating - fullStars >= 0.5; // Half star (½)
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Empty stars (☆)

    return (
      <>
        {Array(fullStars).fill('★').map((star, index) => (
          <span key={index} className="text-yellow-400">{star}</span>
        ))}
        {halfStar && <span className="text-yellow-400">½</span>}
        {Array(emptyStars).fill('☆').map((star, index) => (
          <span key={index + fullStars} className="text-gray-300">{star}</span>
        ))}
      </>
    );
  };

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300">
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>

              {/* Display average rating and stars */}
              <div className="mt-2 flex items-center">
                {renderStars(calculateAverageRating(product.reviews))}
                <span className="ml-2 text-gray-600 text-sm">
                  ({calculateAverageRating(product.reviews)} / 5)
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
