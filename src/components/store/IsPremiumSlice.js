import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const FIREBASE_URL = 'https://expence-tracker-c3991-default-rtdb.firebaseio.com';

const getEmail = () => {
  const email = localStorage.getItem('email');
  if (!email) return '';
  return email.replace(/[@.]/g, '_');
};

export const addPremiumStatus = createAsyncThunk(
  'add-status-premium/addPremiumStatus',
  async (isPremium, { rejectWithValue }) => {
    try {
      const email = getEmail();
      const res = await axios.put(`${FIREBASE_URL}/users/${email}.json`, {
        isPremium,
      });
      return isPremium;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPremiumStatus = createAsyncThunk(
  'fetch-status-premium/fetchPremiumStatus',
  async (_, { rejectWithValue }) => {
    try {
      const email = getEmail();
      const res = await axios.get(`${FIREBASE_URL}/users/${email}.json`);
      const { isPremium } = res.data || {};
      return { isPremium };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const isPremiumSlice = createSlice({
  name: 'isPremium/slice',
  initialState: {
    isPremium: false,
    isDarkTheme: false,
    error: null,
    loading: false,
  },
  reducers: {
    toggleTheme: (state) => {
      const newTheme = !state.isDarkTheme;
      state.isDarkTheme = newTheme;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    },
    resetPremiumState: (state) => {
      state.isPremium = false;
      state.isDarkTheme = false;
    },
    initThemeFromStorage: (state) => {
      const theme = localStorage.getItem('theme');
      state.isDarkTheme = theme === 'dark';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPremiumStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPremiumStatus.fulfilled, (state, action) => {
        state.isPremium = action.payload;
        localStorage.setItem('premium', action.payload ? 'active' : 'inactive');
      })
      .addCase(addPremiumStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPremiumStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPremiumStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isPremium = action.payload.isPremium;
        localStorage.setItem('premium', action.payload.isPremium ? 'active' : 'inactive');
      })
      .addCase(fetchPremiumStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleTheme, resetPremiumState, initThemeFromStorage } = isPremiumSlice.actions;
export default isPremiumSlice.reducer;
