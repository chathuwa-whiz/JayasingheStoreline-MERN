import { apiSlice } from './apiSlice';

export const reviewApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserReviews: builder.query({
            query: (userId) => `/reviews/user/${userId}`,
        }),
    }),
});

export const { useGetUserReviewsQuery } = reviewApiSlice;
