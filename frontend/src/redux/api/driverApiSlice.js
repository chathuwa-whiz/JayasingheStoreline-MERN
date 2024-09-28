import { apiSlice } from './apiSlice';
import { DRIVER_URL } from '../constants';

export const driverApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getDrivers: builder.query({
      query: () => `${DRIVER_URL}`,
      providesTags: ['Driver'],
    }),

    getDriverById: builder.query({
      query: (driverId) => `${DRIVER_URL}/${driverId}`,
      providesTags: (result, error, driverId) => [{ type: 'Driver', id: driverId }],
    }),

    createDriver: builder.mutation({
      query: (driverData) => ({
        url: `${DRIVER_URL}`,
        method: 'POST',
        body: driverData,
      }),
      async onQueryStarted(driverData, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(apiSlice.util.invalidateTags(['Driver']));
        } catch (error) {
          console.error('Error creating driver:', error);
          throw new Error('Adding unsuccessful. Please try again.');
        }
      },
    }),

    updateDriver: builder.mutation({
      query: ({ id, ...driverData }) => ({
        url: `${DRIVER_URL}/${id}`,
        method: 'PUT',
        body: driverData,
      }),
      invalidatesTags: (result, error, { driverId }) => [{ type: 'Driver', id: driverId }],
    }),

    deleteDriver: builder.mutation({
      query: (driverId) => ({
        url: `${DRIVER_URL}/${driverId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Driver'],
    }),

  }),
});

export const {
  useGetDriversQuery,
  useGetDriverByIdQuery,
  useCreateDriverMutation,
  useUpdateDriverMutation,
  useDeleteDriverMutation,
} = driverApiSlice;
