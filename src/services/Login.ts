import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = `http://dev-app-property.uitoux.in/v1/`;

export const LoginApi = createApi({
    reducerPath: "LoginApi",
    baseQuery: fetchBaseQuery({baseUrl: API_URI}),
    endpoints: (builder) => ({
        login: builder.mutation<any, any>({
            query: (data) => ({
                url: `security/authenticate`,
                method: 'POST',
                body: data,
                headers: {
                    authorization: " ",
                },
            })
        }),
        getOtp: builder.mutation<any, any>({
            query: () => `admin/propertyTypes`
        }),
        verifyOtp: builder.mutation<any, any>({
            query: (filterData) => `admin/dashboard/customerListCount?type=${filterData}`
        }),
        resetPassword: builder.mutation<any, any>({
            query: (filterData) => `admin/dashboard/propertyCount?type=${filterData}`
        }),
        checkToken: builder.mutation<any, any>({
            query: (token:any) => ({
                url: `security/verifyUserToken`,
                method: 'POST',
                body: {
                    accessToken: token,
                },
                headers: {
                    authorization: " ",
                },
            })
        }),
        fetchRefreshToken: builder.mutation<any, any>({
            query: (token:any) => ({
                url: `security/refreshTokens`,
                method: 'POST',
                body: {
                    refreshToken: token,
                },
                headers: {
                    authorization: " ",
                },
            })
        }),
    }),
})

export const { 
    useLoginMutation,
    useCheckTokenMutation,
    useFetchRefreshTokenMutation,
    useGetOtpMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation
} = LoginApi;