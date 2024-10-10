import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";


export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
      }),
    }),

    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
    }),

    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: details,
      }),
    }),

    // getPaypalClientId: builder.query({
    //   query: () => ({
    //     url: PAYPAL_URL,
    //   }),
    // }),

    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),

    getOrderById: builder.query({
      query: (orderId) => `${ORDERS_URL}/${orderId}`,
      providesTags: (result, error, orderId) => [
          {type: "Order", id: orderId}
      ],
    }),

    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
    }),

    deleteOrder: builder.mutation({
      query: (orderId) => ({
          url: `${ORDERS_URL}/${orderId}`,
          method: "DELETE",
      }),
      //cause error maybe
      invalidatesTags: ["Order"],
    }),

    updateOrder: builder.mutation({
      query: ({ orderId, formData }) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { orderId }) => [{ type: 'Order', id: orderId }],
    }),

    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),

    getTotalOrders: builder.query({
      query: () => `${ORDERS_URL}/total-orders`,
    }),

    getTotalSales: builder.query({
      query: () => `${ORDERS_URL}/total-sales`,
    }),

    getTotalSalesByDate: builder.query({
      query: () => `${ORDERS_URL}/total-sales-by-date`,
    }),
  }),
});

export const {
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
  useGetTotalSalesByDateQuery,
  // ------------------
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetMyOrdersQuery,
  useDeliverOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetOrderByIdQuery,

} = orderApiSlice;