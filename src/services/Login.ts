import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryAuth } from '@/config/api';
import { GetAuthLoginResponse } from '@/types/api/Login';

// Define a service using a base URL and expected endpoints

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: baseQueryAuth,
  endpoints: builder => ({
    getAuthLogin: builder.mutation<
      GetAuthLoginResponse,
      { username: string; password: string }
    >({
      query: payload => ({
        url: `auth/login`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
  tagTypes: [],
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAuthLoginMutation } = AuthApi;
