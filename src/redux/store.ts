import { configureStore, isPlain } from '@reduxjs/toolkit';
import { billsApi } from './slice/bills.API-slices';
import { gamesApi } from './slice/games.API-slices';
import { payersApi } from './slice/payers.API-slices';


export const store = configureStore({
  reducer: {
    [billsApi.reducerPath]: billsApi.reducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
    [payersApi.reducerPath]: payersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        isSerializable: (value: unknown) =>
          isPlain(value) || value instanceof Date,
      },
    }).concat(
        billsApi.middleware,
        gamesApi.middleware,
        payersApi.middleware,
    ),
});


export type RootState = ReturnType<typeof store.getState>;


