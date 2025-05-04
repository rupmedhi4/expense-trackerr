
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiKey = 'AIzaSyCD3T1zGniDm3GD6469cP9cF4nfy-wADwI';

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Signup failed!');
      return data.idToken;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    const userInfoUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`;

    try {
      // Sign in
      const res = await fetch(signInUrl, {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Login failed!');

      const idToken = data.idToken;

      // Check email verification
      const userRes = await fetch(userInfoUrl, {
        method: 'POST',
        body: JSON.stringify({ idToken }),
        headers: { 'Content-Type': 'application/json' },
      });


      const userData = await userRes.json();
      const emailVerified = userData.users?.[0]?.emailVerified;

      if (!emailVerified) {
        throw new Error('Please verify your email before logging in.');
      }

      
      localStorage.setItem('token', idToken);
      localStorage.setItem('email',email);
      return idToken;

    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//Verification Email 
export const sendVerificationEmail = createAsyncThunk(
  'auth/sendVerificationEmail',
  async (idToken, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
          requestType: 'VERIFY_EMAIL',
          idToken,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

       const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Verification email failed!');
      return 'Verification email sent!';
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || '',
    isLogin: !!localStorage.getItem('token'),
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = '';
      state.isLogin = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isLogin = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendVerificationEmail.rejected, (state, action) => {
        state.error = action.payload;
      })


      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isLogin = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
