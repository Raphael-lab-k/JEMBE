import { configureStore } from '@reduxjs/toolkit';
import agricultureReducer from './agricultureSlice';

const store = configureStore({
  reducer: {
    agriculture: agricultureReducer
  }
});

export default store;
