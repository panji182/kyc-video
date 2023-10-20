import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/config/api';
import { WorkHourList, GetWorkHourListResponse } from '@/types/api/WorkHour';
import { DataActionResponse } from '@/types/api/global';

// Define a service using a base URL and expected endpoints

export const WorkHourApi = createApi({
  reducerPath: 'WorkHourApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getWorkHourList: builder.query<
      GetWorkHourListResponse,
      { pageNo: number; search: string }
    >({
      query: ({ pageNo, search }) => {
        const params = search !== '' ? { params: { search } } : {};
        return {
          url: `whour/list/${pageNo}`,
          ...params,
        };
      },
      providesTags: ['WORK_HOUR_LIST'],
    }),
    getDetailWorkHour: builder.query<WorkHourList, { id: string }>({
      query: ({ id }) => ({
        url: `whour/${id}`,
      }),
    }),
    addNewWorkHour: builder.mutation<DataActionResponse, WorkHourList>({
      query: payload => ({
        url: `whour`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: result => (result ? ['WORK_HOUR_LIST'] : []),
    }),
    updateWorkHour: builder.mutation<
      DataActionResponse,
      { workinghours: WorkHourList }
    >({
      query: ({ workinghours }) => ({
        url: `whour`,
        method: 'PATCH',
        body: workinghours,
      }),
      invalidatesTags: result => (result ? ['WORK_HOUR_LIST'] : []),
    }),
    deleteWorkHour: builder.mutation<DataActionResponse, { id: string }>({
      query: ({ id }) => ({
        url: `whour/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: result => (result ? ['WORK_HOUR_LIST'] : []),
    }),
  }),
  tagTypes: ['WORK_HOUR_LIST'],
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetWorkHourListQuery,
  useGetDetailWorkHourQuery,
  useAddNewWorkHourMutation,
  useUpdateWorkHourMutation,
  useDeleteWorkHourMutation,
} = WorkHourApi;
