import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/config/api';
import { ChannelList, GetChannelListResponse } from '@/types/api/Channel';
import { DataActionResponse } from '@/types/api/global';

// Define a service using a base URL and expected endpoints

export const ChannelApi = createApi({
  reducerPath: 'ChannelApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getChannelList: builder.query<
      GetChannelListResponse,
      { pageNo: number; search: string }
    >({
      query: ({ pageNo, search }) => {
        const params = search !== '' ? { params: { search } } : {};
        return {
          url: `channel/list/${pageNo}`,
          ...params,
        };
      },
      providesTags: ['CHANNEL_LIST'],
    }),
    getDetailChannel: builder.query<ChannelList, { id: string }>({
      query: ({ id }) => ({
        url: `channel/${id}`,
      }),
    }),
    addNewChannel: builder.mutation<DataActionResponse, ChannelList>({
      query: payload => ({
        url: `channel`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: result => (result ? ['CHANNEL_LIST'] : []),
    }),
    updateChannel: builder.mutation<
      DataActionResponse,
      { channel: ChannelList }
    >({
      query: ({ channel }) => ({
        url: `channel`,
        method: 'PATCH',
        body: channel,
      }),
      invalidatesTags: result => (result ? ['CHANNEL_LIST'] : []),
    }),
    deleteChannel: builder.mutation<DataActionResponse, { id: string }>({
      query: ({ id }) => ({
        url: `channel/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: result => (result ? ['CHANNEL_LIST'] : []),
    }),
  }),
  tagTypes: ['CHANNEL_LIST'],
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetChannelListQuery,
  useGetDetailChannelQuery,
  useAddNewChannelMutation,
  useUpdateChannelMutation,
  useDeleteChannelMutation,
} = ChannelApi;
