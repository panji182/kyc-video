import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/config/api';
import {
  HolidayList,
  GetHolidayListResponse,
  GetDetailHolidayListResponse,
} from '@/types/api/Holiday';
import { DataActionResponse } from '@/types/api/global';

// Define a service using a base URL and expected endpoints

export const HolidayApi = createApi({
  reducerPath: 'HolidayApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getHolidayList: builder.query<
      GetHolidayListResponse,
      { pageNo: number; search: string }
    >({
      query: ({ pageNo, search }) => {
        const params = search !== '' ? { params: { search } } : {};
        return {
          url: `holiday/list/${pageNo}`,
          ...params,
        };
      },
      providesTags: ['HOLIDAY_LIST'],
    }),
    getDetailHoliday: builder.query<HolidayList, { id: string }>({
      query: ({ id }) => ({
        url: `holiday/${id}`,
      }),
    }),
    addNewHoliday: builder.mutation<DataActionResponse, HolidayList>({
      query: payload => ({
        url: `holiday`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: result => (result ? ['HOLIDAY_LIST'] : []),
    }),
    updateHoliday: builder.mutation<
      DataActionResponse,
      { holiday: HolidayList }
    >({
      query: ({ holiday }) => ({
        url: `holiday`,
        method: 'PATCH',
        body: holiday,
      }),
      invalidatesTags: result => (result ? ['HOLIDAY_LIST'] : []),
    }),
    deleteHoliday: builder.mutation<DataActionResponse, { id: string }>({
      query: ({ id }) => ({
        url: `holiday/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: result => (result ? ['HOLIDAY_LIST'] : []),
    }),

    //Detail Holiday
    getDetailHolidayList: builder.query<
      GetDetailHolidayListResponse,
      { holidayId: string }
    >({
      query: ({ holidayId }) => ({
        url: `holiday/detail/${holidayId}`,
      }),
      providesTags: ['HOLIDAY_DETAIL_LIST'],
    }),
    addNewDetailHoliday: builder.mutation<
      DataActionResponse,
      GetDetailHolidayListResponse
    >({
      query: payload => ({
        url: `holiday/${payload.holidayid}`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: result => (result ? ['HOLIDAY_DETAIL_LIST'] : []),
    }),
    updateDetailHoliday: builder.mutation<
      DataActionResponse,
      GetDetailHolidayListResponse
    >({
      query: payload => ({
        url: `holiday/${payload.holidayid}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: result => (result ? ['HOLIDAY_DETAIL_LIST'] : []),
    }),
  }),
  tagTypes: ['HOLIDAY_LIST', 'HOLIDAY_DETAIL_LIST'],
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetHolidayListQuery,
  useGetDetailHolidayQuery,
  useAddNewHolidayMutation,
  useUpdateHolidayMutation,
  useDeleteHolidayMutation,
  useLazyGetDetailHolidayListQuery,
  useAddNewDetailHolidayMutation,
  useUpdateDetailHolidayMutation,
} = HolidayApi;
