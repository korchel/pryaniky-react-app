import { configureStore } from "@reduxjs/toolkit";

import { dataApi } from "./dataApi";
import modalSlice from "./modalSlice";

const store = configureStore({
  reducer: {
    [dataApi.reducerPath]: dataApi.reducer,
    modalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataApi.middleware),
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

export default store;
