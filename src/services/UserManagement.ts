import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/config/api';
import { UserList, GetUserListResponse } from '@/types/api/UserManagement';
import { DataActionResponse } from '@/types/api/global';

// Define a service using a base URL and expected endpoints

export const UserManagementApi = createApi({
  reducerPath: 'UserManagementApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getUserList: builder.query<
      GetUserListResponse,
      { pageNo: number; search: string }
    >({
      query: ({ pageNo, search }) => {
        const params = search !== '' ? { params: { search } } : {};
        return {
          url: `user/list/${pageNo}`,
          ...params,
        };
      },
      providesTags: ['USER_LIST'],
    }),
    getDetailUser: builder.query<UserList, { id: string }>({
      query: ({ id }) => ({
        url: `user/${id}`,
      }),
    }),
    addNewUser: builder.mutation<DataActionResponse, UserList>({
      query: payload => ({
        url: `user`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: result => (result ? ['USER_LIST'] : []),
    }),
    updateUser: builder.mutation<DataActionResponse, { user: UserList }>({
      query: ({ user }) => ({
        url: `user`,
        method: 'PATCH',
        body: user,
      }),
      invalidatesTags: result => (result ? ['USER_LIST'] : []),
    }),
    deleteUser: builder.mutation<DataActionResponse, { id: string }>({
      query: ({ id }) => ({
        url: `user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: result => (result ? ['USER_LIST'] : []),
    }),
  }),
  tagTypes: ['USER_LIST'],
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserListQuery,
  useGetDetailUserQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = UserManagementApi;
