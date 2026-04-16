import { configureStore } from '@reduxjs/toolkit';

import featureReducer from '../features/feature/featureSlice';

export const store = configureStore({
  reducer: {
    feature: featureReducer,
  },
});
