import { configureStore } from '@reduxjs/toolkit';

import { dataApi } from './dataApi';

export default configureStore({
  reducer: {
    [dataApi.reducerPath]: dataApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dataApi.middleware),
});