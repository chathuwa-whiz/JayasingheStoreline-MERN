// src/components/ReviewForm.js
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarRating from './StarRating'; // Import the StarRating component

function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState(null);
  const [checkboxes, setCheckboxes] = useState({
    genuineProduct: false,
    worthForPrice: false,
    quickResponse: false,
    sameAsShown: false,
    recommended: false,
    fastDelivery: false,
  });

  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate comment length
    if (comment.trim().length < 1 || comment.trim().length > 200) {
      toast.error('Comment must be between 1 and 200 characters.');
      return;
    }

    // Validate rating and comment
    if (!rating || !comment.trim()) {
      toast.error('Rating and comment are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/reviewRoutes', {
        rating,
        comment,
        photos,
        video,
        checkboxes
      });

      if (response.status === 201) {
        toast.success('Your review has been submitted successfully!');
        // Reset form
        setRating(0);
        setComment('');
        setPhotos([]);
        setVideo(null);
        setCheckboxes({
          genuineProduct: false,
          worthForPrice: false,
          quickResponse: false,
          sameAsShown: false,
          recommended: false,
          fastDelivery: false,
        });
      } else {
        toast.error('Failed to submit the review.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while submitting the review.';
      toast.error(errorMessage);
    }
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(images => {
      setPhotos(prevPhotos => [...prevPhotos, ...images]);
    });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxes(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handlePhotoDelete = (index) => {
    setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setRating(0);
    setComment('');
    setPhotos([]);
    setVideo(null);
    setCheckboxes({
      genuineProduct: false,
      worthForPrice: false,
      quickResponse: false,
      sameAsShown: false,
      recommended: false,
      fastDelivery: false,
    });
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-[#fbf3f2] shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Submit Your Review</h2>
      <form onSubmit={handleSubmit}>
        {/* Star Rating at the beginning */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating:
          </label>
          <div className="flex justify-center mb-4">
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>
        </div>

        <div className="flex mb-4 space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <button
                type="button"
                onClick={() => photoInputRef.current.click()}
                className="bg-[#1c768f] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#155a6b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1c768f]"
              >
                Insert Photos
              </button>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoChange}
                ref={photoInputRef}
                className="hidden"
              />
            </label>
            <div className="relative mt-2 w-full h-32 bg-gray-50 border border-gray-300 rounded-md overflow-hidden">
              {photos.length > 0 ? (
                <img
                  src={photos[0]}
                  alt="Selected"
                  className="object-cover w-full h-full cursor-pointer"
                />
              ) : (
                <p className="text-gray-500">No photo selected</p>
              )}
            </div>
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <button
                type="button"
                onClick={() => videoInputRef.current.click()}
                className="bg-[#1c768f] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#155a6b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1c768f]"
              >
                Insert Video
              </button>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                ref={videoInputRef}
                className="hidden"
              />
            </label>
            <div className="relative mt-2 w-full h-32 bg-gray-50 border border-gray-300 rounded-md overflow-hidden">
              {video ? (
                <video
                  src={video}
                  controls
                  className="object-cover w-full h-full"
                />
              ) : (
                <p className="text-gray-500">No video selected</p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Review:
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              minLength={1}
              maxLength={200}
              placeholder="Please write at least 1 word and no more than 200 words."
              className="mt-1 block w-full h-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Feedback:
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'genuineProduct', label: 'Genuine Product' },
              { name: 'worthForPrice', label: 'Worth for Price' },
              { name: 'quickResponse', label: 'Quick Response' },
              { name: 'sameAsShown', label: 'Same as Shown' },
              { name: 'recommended', label: 'Recommended' },
              { name: 'fastDelivery', label: 'Fast Delivery' }
            ].map(({ name, label }) => (
              <div key={name} className="flex items-center">
                <input
                  type="checkbox"
                  name={name}
                  checked={checkboxes[name]}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-[#1c768f] focus:ring-[#1c768f] border-gray-300 rounded"
                />
                <label htmlFor={name} className="ml-2 block text-sm text-gray-900">
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-[#1c768f] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#155a6b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1c768f]"
          >
            Submit Review
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ReviewForm;
