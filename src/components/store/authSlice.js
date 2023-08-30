import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    isLogin: !!localStorage.getItem('token'),
  },
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isLogin = true;
    },
    logout(state) {
      state.token = null;
      state.isLogin = false;
    },
    
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;