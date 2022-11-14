import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from '../app/store';

const API_URI = `http://dev-app-property.uitoux.in/v1/`;

export const customerApi = createApi({
    reducerPath: "customerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URI,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState)?.userReducer?.token;        
            if (token) {
                headers.set('authorization', `Bearer ${token}`); 
            }
            return headers;
          },
    }),
    tagTypes: ["customer", "customerDetails"],
    endpoints: (builder) => ({
        customerList: builder.query<any, any>({
            query: ({pageSize,selectedPage,searchString}) => {
              const searchQuery =
                String(searchString) !== "" ? `&searchString=${searchString}` : "";
                return({
                      url: `admin/customerListing?pageSize=${pageSize}&pageNumber=${selectedPage}${searchQuery}`,
                    }) 
            },
            providesTags: ["customer"]
        }),
        customerDetails: builder.query<any, any>({
            query: ({id,pageSize,selectedPage,searchString}) => {
                const searchQuery =
                String(searchString) !== "" ? `&searchString=${searchString}` : "";
                return({
                    url: `admin/customerListing/${id}?pageSize=${pageSize}&pageNumber=${selectedPage}${searchQuery}`
                })
            },
            providesTags: ["customerDetails"]
        }),
        statusUpdate: builder.mutation<any, any>({
            query: (data) => ({
                url: `admin/customerStatusUpdate`,
                method: 'PUT',
                body: data,
            })
        }),
        deleteCustomer: builder.mutation<any, any>({
            query: (data) => ({
                url: `admin/deleteCustomers`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["customer"]
        }),
    }),
})

export const {
    useCustomerListQuery,
    useCustomerDetailsQuery,
    useStatusUpdateMutation,
    useDeleteCustomerMutation
} = customerApi;