import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const userEmail = localStorage.getItem('email');
const mail = userEmail?.replace('@', '').replace('.', '');

const initialState = {
    listData: [],
    totalExpense: 0,
    status: 'idle',
    error: null,
    
};


export const fetchExpenses = createAsyncThunk(
    'expenses/fetchExpenses',
    async () => {
        const response = await axios.get(`https://expence-tracker-c3991-default-rtdb.firebaseio.com/${mail}.json`);
        const data = response.data;
        const post = [];

        for (let key in data) {
            post.push({ ...data[key], id: key });
        }

        return post;
    }
);


export const deleteExpense = createAsyncThunk(
    'expenses/deleteExpense',
    async (id) => {
        await axios.delete(`https://expence-tracker-c3991-default-rtdb.firebaseio.com/${mail}/${id}.json`);
        return id;
    }
);


export const addExpense = createAsyncThunk(
    'expenses/addExpense',
    async (expense) => {
        const response = await axios.post(
            `https://expence-tracker-c3991-default-rtdb.firebaseio.com/${mail}.json`,
            JSON.stringify(expense),
            { headers: { 'Content-Type': 'application/json' } }
        );
      
        
        return { ...expense, id: response.data.name };
    }
);

const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {

        calculateTotal(state) {
            let total = 0;
            state.listData.forEach(item => {
                const amt = parseInt(item.amount);
                if (!isNaN(amt)) total += amt;
            });
            state.totalExpense = total;
        }
        
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.listData = action.payload;
            })
            .addCase(deleteExpense.fulfilled, (state, action) => {
                state.listData = state.listData.filter(item => item.id !== action.payload);
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.listData.push(action.payload);
                console.log(state.listData);
            });
    }
});

export const { calculateTotal } = expenseSlice.actions;
export default expenseSlice.reducer;
