import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const requestHeaders = new Headers(request.headers);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const pathname = request.nextUrl.pathname;
  requestHeaders.set('x-my-pathname', pathname);
  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}
