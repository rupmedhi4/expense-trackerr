import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  listData: [],
  totalExpense: 0,
  status: '',
  error: null,
};

// Utility: Sanitize email
const getSanitizedEmail = () => {
  const email = localStorage.getItem('email');
  return email?.replace(/[@.]/g, '');
};

// ✅ Thunk: Fetch Expenses
export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async (_, { rejectWithValue }) => {
    try {
      const mail = getSanitizedEmail();
      const response = await axios.get(
        `https://expence-tracker-c3991-default-rtdb.firebaseio.com/expenses/${mail}.json`
      );
      const data = response.data || {};
      const post = [];

      for (let key in data) {
        post.push({ ...data[key], id: key });
      }

      return post;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Thunk: Add Expense
export const addExpense = createAsyncThunk(
  'expenses/addExpense',
  async (expense, { rejectWithValue }) => {
    try {
      const mail = getSanitizedEmail();
      const response = await axios.post(
        `https://expence-tracker-c3991-default-rtdb.firebaseio.com/expenses/${mail}.json`,
        JSON.stringify(expense),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log(response);
      return { ...expense, id: response.data.name };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Thunk: Delete Expense
export const deleteExpense = createAsyncThunk(
  'expenses/deleteExpense',
  async (id, { rejectWithValue }) => {
    try {
      const mail = getSanitizedEmail();
      await axios.delete(
        `https://expence-tracker-c3991-default-rtdb.firebaseio.com/expenses/${mail}/${id}.json`
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Slice
const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    calculateTotal(state) {
      let total = 0;
      state.listData.forEach((item) => {
        const amt = parseInt(item.amount);
        if (!isNaN(amt)) total += amt;
      });
      state.totalExpense = total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.listData = action.payload;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.listData = state.listData.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.listData.push(action.payload);
      
        
      });
  },
});

export const { calculateTotal } = expenseSlice.actions;
export default expenseSlice.reducer;
