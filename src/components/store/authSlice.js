// components/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  token: localStorage.getItem('token') || '',
  isLogin: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isLogin = true;
    },
    logout(state) {
      state.token = '';
      state.isLogin = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
