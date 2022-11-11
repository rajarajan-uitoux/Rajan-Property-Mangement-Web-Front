import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from '../app/store';

const API_URI = `http://dev-app-property.uitoux.in/v1/`;

export const InformationApi = createApi({
    reducerPath: "InformationApi",
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
    tagTypes: ["Information"],
    endpoints: (builder) => ({
        informationList: builder.query<any, void>({
            query: () => `admin/informations`,
            providesTags: ["Information"]
        }),
        addInformation: builder.mutation<any, any>({
            query: (data) => ({
                url: `admin/informations`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Information"]
        }),
        editInformation: builder.mutation<any, any>({
            query: ({id,data}) => ({
                url: `admin/informations/${id}`,
                method: 'PATCH',
                body: data,
            })
        }),
        deleteInformation: builder.mutation<any, any>({
            query: (data) => ({
                url: `admin/informations/${data.id}`,
                method: 'DELETE',
                body: data
            }),
            invalidatesTags: ["Information"]
        }),
    }),
})

export const {
    useAddInformationMutation,
    useInformationListQuery,
    useDeleteInformationMutation,
    useEditInformationMutation
} = InformationApi;