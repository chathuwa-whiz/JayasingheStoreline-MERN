import { SUPPLIER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const supplierApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getSuppliers: builder.query({
            query: ({ keyword }) => ({
                url: `${SUPPLIER_URL}`,
                params: { keyword },
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Supplier"],
        }),

        getSupplierById: builder.query({
            query: (supplierId) => `${SUPPLIER_URL}/${supplierId}`,
            providesTags: (result, error, supplierId) => [
                {type: "Supplier", id: supplierId}
            ],
        }),

        createSupplier: builder.mutation({
            query: (supplierData) => ({
                url: `${SUPPLIER_URL}`,
                method: "POST",
                body: supplierData,
            }),
            invalidatesTags: ["Supplier"],
        }),

        updateSupplier: builder.mutation({
            query: ({ supplierId, formData }) => ({
                url: `${SUPPLIER_URL}/${supplierId}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: (result, error, { supplierId }) => [
                { type: "Supplier", id: supplierId },
            ],
        }),

        deleteSupplier: builder.mutation({
            query: (supplierId) => ({
                url: `${SUPPLIER_URL}/${supplierId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Supplier"],
        }),

        getTopSuppliers: builder.query({
            query: () => `${SUPPLIER_URL}/top`,
            keepUnusedDataFor: 5,
        }),

    }),
});

export const {
    useGetSuppliersQuery,
    useGetSupplierByIdQuery,
    useCreateSupplierMutation,
    useUpdateSupplierMutation,
    useDeleteSupplierMutation,
    useGetTopSuppliersQuery,
} = supplierApiSlice;
