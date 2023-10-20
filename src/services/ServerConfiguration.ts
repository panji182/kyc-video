import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/config/api';
import {
  ServerConfigurationList,
  GetServerConfigurationListResponse,
} from '@/types/api/ServerConfiguration';
import { DataActionResponse } from '@/types/api/global';

// Define a service using a base URL and expected endpoints

export const ServerConfigurationApi = createApi({
  reducerPath: 'ServerConfigurationApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getServerConfigurationList: builder.query<
      GetServerConfigurationListResponse,
      { pageNo: number }
    >({
      query: ({ pageNo }) => `config/${pageNo}`,
      providesTags: ['SERVER_CONFIGURATION_LIST'],
    }),
    addNewServerConfiguration: builder.mutation<
      DataActionResponse,
      { config: ServerConfigurationList[] }
    >({
      query: payload => ({
        url: `config`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: result => (result ? ['SERVER_CONFIGURATION_LIST'] : []),
    }),
    updateServerConfiguration: builder.mutation<
      DataActionResponse,
      { config: ServerConfigurationList[] }
    >({
      query: payload => ({
        url: `config`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: result => (result ? ['SERVER_CONFIGURATION_LIST'] : []),
    }),
  }),
  tagTypes: ['SERVER_CONFIGURATION_LIST'],
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetServerConfigurationListQuery,
  useAddNewServerConfigurationMutation,
  useUpdateServerConfigurationMutation,
} = ServerConfigurationApi;
