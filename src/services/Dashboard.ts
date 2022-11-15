import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from '../app/store';

const API_URI = `http://dev-app-property.uitoux.in/v1/`;
export const DashboardApi = createApi({
    reducerPath: "DashboardApi",
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
    endpoints: (builder) => ({
        getTotalCount: builder.query<any, void>({
            query: () => `admin/totalcount`
        }),
        getPropertyTypes: builder.query<any, void>({
            query: () => `admin/propertyTypes`
        }),
        getCustomerChart: builder.query<any, any>({
            query: ({datelabel, property}) => {
                const API_URL = property === "Customers" ? "customerListCount" : "propertyCount";
                return ({
                    url: `admin/dashboard/${API_URL}?type=${datelabel}`,
                })
            }
        }),
        getPropertyChart: builder.query<any, String>({
            query: (filterData) => `admin/dashboard/propertyCount?type=${filterData}`
        }),
    }),
})

export const {
    useGetTotalCountQuery,
    useGetPropertyTypesQuery,
    useGetCustomerChartQuery,
    useGetPropertyChartQuery
} = DashboardApi;