// src/components/SpecificReview.js
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SpecificReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
    photos: [],
    video: null,
    checkboxes: {
      genuineProduct: false,
      worthForPrice: false,
      quickResponse: false,
      sameAsShown: false,
      recommended: false,
      fastDelivery: false,
    }
  });

  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/reviewRoutes/${id}`);
        setReview(response.data);
        setFormData({
          rating: response.data.rating,
          comment: response.data.comment,
          photos: response.data.photos || [],
          video: response.data.video || null,
          checkboxes: response.data.checkboxes || {
            genuineProduct: false,
            worthForPrice: false,
            quickResponse: false,
            sameAsShown: false,
            recommended: false,
            fastDelivery: false,
          },
        });
      } catch (error) {
        console.error('Error fetching review:', error);
        setError('Review not found or an error occurred.');
      }
    };

    fetchReview();
  }, [id]);

  const handleEditToggle = () => {
    setEditMode(prevMode => !prevMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      checkboxes: {
        ...prevState.checkboxes,
        [name]: checked,
      },
    }));
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
      setFormData(prevData => ({
        ...prevData,
        photos: [...prevData.photos, ...images],
      }));
    });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevData => ({
          ...prevData,
          video: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoDelete = (index) => {
    setFormData(prevData => ({
      ...prevData,
      photos: prevData.photos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:4000/api/reviewRoutes/${id}`, formData);

      if (response.status === 200) {
        toast.success('Review updated successfully!');
        setReview(response.data);
        setEditMode(false);
      } else {
        toast.error('Failed to update the review.');
      }
    } catch (error) {
      console.error('Update error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while updating the review.';
      toast.error(errorMessage);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/reviewRoutes/${id}`);
      toast.success('Review deleted successfully!');
      navigate('/');  // Redirect to home or reviews list after deletion
    } catch (error) {
      console.error('Delete error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while deleting the review.';
      toast.error(errorMessage);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!review) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Review Details</h2>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating:
            </label>
            <div className="flex justify-center mb-4">
              <StarRating rating={formData.rating} onRatingChange={(rating) => setFormData(prev => ({ ...prev, rating }))} />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Comment:
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                required
                minLength={1}
                maxLength={200}
                placeholder="Please write at least 1 word and no more than 200 words."
                className="mt-1 block w-full h-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>
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
                {formData.photos.length > 0 ? (
                  <div className="flex space-x-2">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={photo}
                          alt="Selected"
                          className="object-cover w-24 h-24 cursor-pointer"
                        />
                        <button
                          type="button"
                          onClick={() => handlePhotoDelete(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
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
                {formData.video ? (
                  <video
                    src={formData.video}
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
                    checked={formData.checkboxes[name]}
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
              Update Review
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="mb-2">
            <StarRating rating={review.rating} />
          </div>
          <p className="text-gray-700 mb-2">{review.comment}</p>
          {review.photos && review.photos.length > 0 && (
            <div className="flex space-x-2">
              {review.photos.map((photo, index) => (
                <img key={index} src={photo} alt="Review" className="w-24 h-24 object-cover rounded-md" />
              ))}
            </div>
          )}
          {review.video && (
            <div className="mt-2">
              <video src={review.video} controls className="w-full rounded-md"></video>
            </div>
          )}
          <div className="mt-2">
            {Object.keys(review.checkboxes).map((key) => (
              review.checkboxes[key] && (
                <span key={key} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full mr-2">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
              )
            ))}
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              type="button"
              onClick={handleEditToggle}
              className="bg-[#1c768f] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#155a6b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1c768f]"
            >
              Edit Review
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
            >
              Delete Review
            </button>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default SpecificReview;
