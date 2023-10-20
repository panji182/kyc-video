import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/config/api';
import {
  VideoJingleList,
  GetVideoJingleListResponse,
} from '@/types/api/VideoJingle';
import { DataActionResponse } from '@/types/api/global';

// Define a service using a base URL and expected endpoints

export const VideoJingleApi = createApi({
  reducerPath: 'VideoJingleApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getVideoJingleList: builder.query<
      GetVideoJingleListResponse,
      { pageNo: number; search: string }
    >({
      query: ({ pageNo, search }) => {
        const params = search !== '' ? { params: { search } } : {};
        return {
          url: `jingle/list/${pageNo}`,
          ...params,
        };
      },
      providesTags: ['VIDEO_JINGLE_LIST'],
    }),
    getDetailVideoJingle: builder.query<VideoJingleList, { id: string }>({
      query: ({ id }) => ({
        url: `jingle/${id}`,
      }),
    }),
    addNewVideoJingle: builder.mutation<DataActionResponse, VideoJingleList>({
      query: payload => ({
        url: `jingle`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: result => (result ? ['VIDEO_JINGLE_LIST'] : []),
    }),
    updateVideoJingle: builder.mutation<
      DataActionResponse,
      { jingles: VideoJingleList }
    >({
      query: ({ jingles }) => ({
        url: `jingle`,
        method: 'PATCH',
        body: jingles,
      }),
      invalidatesTags: result => (result ? ['VIDEO_JINGLE_LIST'] : []),
    }),
    deleteVideoJingle: builder.mutation<DataActionResponse, { id: string }>({
      query: ({ id }) => ({
        url: `jingle/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: result => (result ? ['VIDEO_JINGLE_LIST'] : []),
    }),
  }),
  tagTypes: ['VIDEO_JINGLE_LIST'],
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetVideoJingleListQuery,
  useGetDetailVideoJingleQuery,
  useAddNewVideoJingleMutation,
  useUpdateVideoJingleMutation,
  useDeleteVideoJingleMutation,
} = VideoJingleApi;
