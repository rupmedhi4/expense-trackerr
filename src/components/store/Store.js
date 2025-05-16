import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";  
import expenseReducer from "./expenseSlice";  
import isPremiumSlice from "./IsPremiumSlice";  

const Store = configureStore({
  reducer: {
    auth: authReducer,  
    expenses: expenseReducer,
    isPremium: isPremiumSlice

  },
});

export default Store;
