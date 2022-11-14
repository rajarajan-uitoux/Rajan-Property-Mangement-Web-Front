import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { DashboardApi } from '../services/Dashboard';
import { LoginApi } from '../services/Login';
import { customerApi } from '../services/customer';
import { InformationApi } from '../services/Information';
import authSlice from "./slices/loginSlice";

export const store = configureStore({
  reducer: {
    userReducer: authSlice,
    [DashboardApi.reducerPath]: DashboardApi.reducer,
    [LoginApi.reducerPath]: LoginApi.reducer,
    [InformationApi.reducerPath]: InformationApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
    .concat(LoginApi.middleware)
    .concat(DashboardApi.middleware)
    .concat(customerApi.middleware)
    .concat(InformationApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
