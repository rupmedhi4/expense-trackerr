import React, { useEffect, useState } from 'react';
import ExpenseFormHeader from './ExpenseFormHeader';
import ExpenseForm from './ExpenseForm';
import ShowingExpenses from './ShowingExpenses';
import './ExpenseFormHeader.css';
import { useSelector } from 'react-redux';

const Expenses = () => {
  const {isDarkTheme} = useSelector((state) => state.isPremium)

  return (
    <div className={`expenses-container ${isDarkTheme ? 'dark-theme' : ''}`}>
      <ExpenseFormHeader  />
      <ExpenseForm />
    </div>
  );
};

export default Expenses;