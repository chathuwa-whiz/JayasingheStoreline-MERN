import { apiSlice } from './apiSlice';
import { DRIVER_URL } from '../constants';

export const driverApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDrivers: builder.query({
      query: () => `${DRIVER_URL}/drivers`,
      providesTags: ['Driver'],
    }),
    getDriverById: builder.query({
      query: (driverId) => `${DRIVER_URL}/drivers/${driverId}`,
      providesTags: (result, error, driverId) => [{ type: 'Driver', id: driverId }],
    }),
    createDriver: builder.mutation({
      query: (driverData) => ({
        url: `${DRIVER_URL}/drivers`,
        method: 'POST',
        body: driverData,
      }),
      invalidatesTags: ['Driver'],
    }),
    updateDriver: builder.mutation({
      query: ({ driverId, driverData }) => ({
        url: `${DRIVER_URL}/drivers/${driverId}`,
        method: 'PUT',
        body: driverData,
      }),
      invalidatesTags: (result, error, { driverId }) => [{ type: 'Driver', id: driverId }],
    }),
    deleteDriver: builder.mutation({
      query: (driverId) => ({
        url: `${DRIVER_URL}/drivers/${driverId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Driver'],
    }),
    // Similar endpoints for vehicles
  }),
});

export const {
  useGetDriversQuery,
  useGetDriverByIdQuery,
  useCreateDriverMutation,
  useUpdateDriverMutation,
  useDeleteDriverMutation,
  // Similar exports for vehicles
} = driverApiSlice;
