import { getCookie, setCookie } from 'cookies-next';
import { decrypt, getHTTPRequests } from '@/helpers/globalFunctions';

import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

export const baseQueryAuth = fetchBaseQuery({
  baseUrl: process.env.BASE_API_URL,
});

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.BASE_API_URL,
  // prepareHeaders(headers: any) {
  //   const token = getCookie('token');

  //   if (token) {
  //     headers.set('Authorization', `Bearer ${token}`);
  //   }

  //   return headers;
  // },
});
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(28, result);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const auth: string = getCookie('auth') || '';
    const currToken = getCookie('token') || '';
    const authCookie =
      auth !== '' ? decrypt(auth, process.env.SECRET_KEY || '') : null;
    const refreshResult = await getHTTPRequests(
      'auth/refresh',
      'POST',
      undefined,
      undefined,
      {
        username: authCookie.username,
        refreshtoken: currToken,
      }
    );
    if (refreshResult.token) {
      // store the new token
      setCookie('token', refreshResult.token);
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log(57, 'failed refresh token !');
    }
  }
  return result;
};
