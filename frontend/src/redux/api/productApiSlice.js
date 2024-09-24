import { deleteInquiry, getInquiriesByInquiryId } from "../../../../backend/controllers/ProductController";
import { PRODUCT_URL, UPLOAD_URL,REVIEWS_URL, DASHBOARDLIST_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getProducts: builder.query({
            query: ({ keyword }) => ({
                url: `${PRODUCT_URL}`,
                params: { keyword },
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Product"],
        }),
    
        getProductById: builder.query({
            query: (productId) => `${PRODUCT_URL}/${productId}`,
            providesTags: (result, error, productId) => [
                { type: "Product", id: productId }
            ],
        }),

        allProducts: builder.query({
            query: () => `${PRODUCT_URL}`,
        }),

        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
      
        createProduct: builder.mutation({
            query: (productData) => ({
                url: `${PRODUCT_URL}`,
                method: "POST",
                body: productData,
            }),
            invalidatesTags: ["Product"],
        }),
    
        updateProduct: builder.mutation({
            query: ({ productId, formData }) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: "PUT",
                body: formData,
            }),
        }),

        updateOneProduct: builder.mutation({
            query: ({ productId, quantity, purchasePrice, reOrderQty }) => ({
                url: `${PRODUCT_URL}/updatestock/${productId}`,
                method: "PUT",
                body: {
                    countInStock: quantity,
                    reOrderQty: reOrderQty,
                    buyingPrice: purchasePrice,
                },
            }),
        }),
    
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: "POST",
                body: data,
            }),
        }),
    
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Product"],
        }),

        // Create a review
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/${data.productId}`,
                method: "POST",
                body: data,
            }),
        }),

        // Create an inquiry
        createInquiry: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/${data.productId}/inquiries`,
                method: "POST",
                body: data,
            }),
        }),

        // Update a review
        updateReview: builder.mutation({
        query: ({ productId, reviewId, rating, comment }) => ({
            url: `${PRODUCT_URL}/${productId}/${reviewId}`,
            method: 'PUT',
            body: { rating, comment },
        }),
        invalidatesTags: (result, error, { productId, reviewId }) => [
            { type: 'Product', id: productId }, // Ensure the product's cached data is invalidated
            { type: 'Reviews', id: reviewId },  // Optionally, you could invalidate the review as well
        ],
        }),

        // Delete a review
        deleteReview: builder.mutation({
        query: ({ productId, reviewId }) => ({
            url: `${PRODUCT_URL}/${productId}/${reviewId}`, // Assuming the reviews are part of the product endpoint
            method: 'DELETE',
        }),
        invalidatesTags: (result, error, { productId, reviewId }) => [
            { type: 'Product', id: productId }, // Invalidate the product cache
            { type: 'Reviews', id: reviewId },  // Optionally invalidate the review cache
        ],
        }),

 // Delete an inquiry
deleteInquiry: builder.mutation({
    query: ({ productId, inquiryId }) => ({
        url: `${PRODUCT_URL}/${productId}/${inquiryId}`, // Use inquiryId here
        method: 'DELETE',
    }),
    invalidatesTags: (result, error, { productId, inquiryId }) => [
        { type: 'Product', id: productId }, // Invalidate the product cache
        { type: 'Inquiries', id: inquiryId },  // You might want to create an Inquiries tag
    ],
}),

            

        // Reply to an inquiry
        replyToInquiry: builder.mutation({
            query: ({ productId, inquiryId, replyMessage }) => ({
                url: `${PRODUCT_URL}/${productId}/inquiries/${inquiryId}/reply`,
                method: 'POST',
                body: { replyMessage },
            }),
        }),

        getTopProducts: builder.query({
            query: () => `${PRODUCT_URL}/top`,
            keepUnusedDataFor: 5,
        }),
    
        getNewProducts: builder.query({
            query: () => `${PRODUCT_URL}/new`,
            keepUnusedDataFor: 5,
        }),

        getFilteredProducts: builder.query({
            query: ({ checked, radio }) => ({
              url: `${PRODUCT_URL}/filtered-products`,
              method: "POST",
              body: { checked, radio },
            }),
        }),

        getReviewById: builder.query({
            query: ({ productId, reviewId }) => `${PRODUCT_URL}/${productId}/${reviewId}`,
            transformResponse: (response) => response, // Optionally transform the response if needed
        }),


        getInquiriesByInquiryId: builder.query({
            query: ({ productId, inquiryId }) => `${PRODUCT_URL}/${productId}/${inquiryId}`,
            transformResponse: (response) => response, // Optionally transform the response if needed
        }),
        
        
        
    }),
});

export const {
    useGetProductByIdQuery,
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useAllProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUpdateOneProductMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useCreateInquiryMutation,
    useReplyToInquiryMutation,
    useGetTopProductsQuery,
    useGetNewProductsQuery,
    useUploadProductImageMutation,
    useGetFilteredProductsQuery,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
    useDeleteInquiryMutation,
    useGetReviewByIdQuery,
    useGetInquiriesByInquiryIdQuery,
} = productApiSlice;
