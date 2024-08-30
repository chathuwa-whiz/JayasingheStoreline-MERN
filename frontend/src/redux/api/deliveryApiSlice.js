import { DELIVERY_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const deliveryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // Get all deliveries
    getDeliveries: builder.query({
      query: () => `${DELIVERY_URL}`,
      keepUnusedDataFor: 5,
      providesTags: ["Delivery"],
    }),

    // Get delivery by ID
    getDeliveryById: builder.query({
      query: (deliveryId) => `${DELIVERY_URL}/${deliveryId}`,
      providesTags: (result, error, deliveryId) => [
        { type: "Delivery", id: deliveryId },
      ],
    }),

    // Create a new delivery
    createDelivery: builder.mutation({
      query: (deliveryData) => ({
        url: `${DELIVERY_URL}`,
        method: "POST",
        body: deliveryData,
      }),
      invalidatesTags: ["Delivery"],
    }),

    // Update a delivery by ID
    updateDelivery: builder.mutation({
      query: ({ deliveryId, formData }) => ({
        url: `${DELIVERY_URL}/${deliveryId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { deliveryId }) => [
        { type: "Delivery", id: deliveryId },
      ],
    }),

    // Delete a delivery by ID
    deleteDelivery: builder.mutation({
      query: (deliveryId) => ({
        url: `${DELIVERY_URL}/${deliveryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Delivery"],
    }),

    // Upload delivery image
    uploadDeliveryImage: builder.mutation({
      query: (imageData) => ({
        url: `${DELIVERY_URL}/upload-image`,
        method: "POST",
        body: imageData,
      }),
    }),

    // Get deliveries filtered by certain criteria
    getFilteredDeliveries: builder.query({
      query: ({ filterData }) => ({
        url: `${DELIVERY_URL}/filtered-deliveries`,
        method: "POST",
        body: filterData,
      }),
    }),

  }),
});

export const {
  useGetDeliveriesQuery,
  useGetDeliveryByIdQuery,
  useCreateDeliveryMutation,
  useUpdateDeliveryMutation,
  useDeleteDeliveryMutation,
  useUploadDeliveryImageMutation,  // <-- New export added
  useGetFilteredDeliveriesQuery,
} = deliveryApiSlice;
