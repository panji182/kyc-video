import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { UserManagementApi } from '@/services/UserManagement';
import { ChannelApi } from '@/services/Channel';
import { VideoJingleApi } from '@/services/VideoJingle';
import { WorkHourApi } from '@/services/WorkHour';
import { HolidayApi } from '@/services/Holiday';
import { ServerConfigurationApi } from '@/services/ServerConfiguration';
import { AuthApi } from '@/services/Login';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [UserManagementApi.reducerPath]: UserManagementApi.reducer,
    [ChannelApi.reducerPath]: ChannelApi.reducer,
    [VideoJingleApi.reducerPath]: VideoJingleApi.reducer,
    [WorkHourApi.reducerPath]: WorkHourApi.reducer,
    [HolidayApi.reducerPath]: HolidayApi.reducer,
    [ServerConfigurationApi.reducerPath]: ServerConfigurationApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
      UserManagementApi.middleware,
      ChannelApi.middleware,
      VideoJingleApi.middleware,
      WorkHourApi.middleware,
      HolidayApi.middleware,
      ServerConfigurationApi.middleware,
      AuthApi.middleware,
    ]),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
