// src/redux/reviewApiSlice.js
import { apiSlice } from './apiSlice'; // Adjust the path if needed
import { REVIEWS_URL } from '../constants'; // Ensure this constant is correctly defined

export const reviewApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addReview: builder.mutation({
            query: (review) => ({
                url: REVIEWS_URL,
                method: 'POST',
                body: review,
            }),
            // Optional: Invalidate cache tags for related queries
            invalidatesTags: [{ type: 'Reviews' }],
        }),

        getReviews: builder.query({
            query: (productId) => ({
                url: `${REVIEWS_URL}/${productId}`,
            }),
            // Optional: Provide cache tags for related queries
            providesTags: (result, error, productId) => [{ type: 'Reviews', id: productId }],
        }),

        deleteReview: builder.mutation({
            query: ({ productId, reviewId }) => ({
                url: `${REVIEWS_URL}/${productId}/${reviewId}`,
                method: 'DELETE',
            }),
            // Optional: Invalidate cache tags for related queries
            invalidatesTags: (result, error, { productId }) => [{ type: 'Reviews', id: productId }],
        }),

        updateReview: builder.mutation({
            query: ({ productId, reviewId, reviewData }) => ({
                url: `${REVIEWS_URL}/${productId}/${reviewId}`,
                method: 'PUT',
                body: reviewData,
            }),
            // Optional: Invalidate cache tags for related queries
            invalidatesTags: (result, error, { productId }) => [{ type: 'Reviews', id: productId }],
        }),

        getTotalReviews: builder.query({
            query: () => `${REVIEWS_URL}/total-reviews`,
        }),

        getAverageRating: builder.query({
            query: (productId) => `${REVIEWS_URL}/${productId}/average-rating`,
        }),
    }),
});

export const {
    useAddReviewMutation,
    useGetReviewsQuery,
    useDeleteReviewMutation,
    useUpdateReviewMutation,
    useGetTotalReviewsQuery,
    useGetAverageRatingQuery,
} = reviewApiSlice;
