import { createSlice } from '@reduxjs/toolkit';
import { FERTILIZER_DATA } from '../data/fertilizerData';
import { SEED_DATA } from '../data/seedData';

const agricultureSlice = createSlice({
  name: 'agriculture',
  initialState: {
    fertilizers: FERTILIZER_DATA,
    seeds: SEED_DATA,
    favorites: [],
    progressLog: []
  },
  reducers: {
    addToFavorites: (state, action) => {
      const item = action.payload;
      if (!state.favorites.some(fav => fav.id === item.id)) {
        state.favorites.push(item);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(item => item.id !== action.payload);
    },
    logProgress: (state, action) => {
      state.progressLog.push({
        ...action.payload,
        timestamp: new Date().toISOString()
      });
    },
    clearProgressLog: (state) => {
      state.progressLog = [];
    }
  }
});

export const { addToFavorites, removeFromFavorites, logProgress, clearProgressLog } = agricultureSlice.actions;
export default agricultureSlice.reducer;
