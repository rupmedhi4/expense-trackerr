import { createSlice } from '@reduxjs/toolkit';
const initialAuthState = {
  token: localStorage.getItem('token'),
  isLogin: !!localStorage.getItem('token'),
 
};
const authSlice = createSlice({
  name: 'auth',
  initialState:initialAuthState,
  reducers: {
    login(state) {
      state.token = localStorage.getItem('token');
      state.isLogin = true;
    },
    logout(state) {
      state.token = null;
      state.isLogin = false;
    },
    
    
  },
});

export const { login, logout} = authSlice.actions;
export default authSlice.reducer;