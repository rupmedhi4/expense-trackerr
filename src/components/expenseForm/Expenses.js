import React, { useState } from 'react';
import ExpenseFormHeader from './ExpenseFormHeader';
import ExpenseForm from './ExpenseForm';
import ShowingExpenses from './ShowingExpenses';
import './ExpenseFormHeader.css';

const Expenses = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div className={`expenses-container ${isDarkTheme ? 'dark-theme' : ''}`}>
      <ExpenseFormHeader toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
      <ExpenseForm />
    </div>
  );
};

export default Expenses;