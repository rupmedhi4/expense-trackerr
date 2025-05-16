import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses, calculateTotal } from '../store/expenseSlice';
import { logout } from '../store/authSlice';
import { CSVLink } from 'react-csv';
import { useNavigate, Link } from 'react-router-dom';
import './ExpenseFormHeader.css';

import {
  addPremiumStatus,
  fetchPremiumStatus,
  toggleTheme,
  resetPremiumState,
  initThemeFromStorage,
} from '../store/IsPremiumSlice';

const ExpenseFormHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = useSelector((state) => state.expenses.totalExpense);
  const listData = useSelector((state) => state.expenses.listData);
  const { isPremium, isDarkTheme } = useSelector((state) => state.isPremium);

  useEffect(() => {
    dispatch(initThemeFromStorage());
    const loadData = async () => {
      await dispatch(fetchExpenses());
      await dispatch(calculateTotal());
      await dispatch(fetchPremiumStatus());
    };
    loadData();
  }, []);

  useEffect(() => {
    if (total >= 10000) {
      const isPremiumActive = localStorage.getItem('premium');
      if (isPremiumActive) {
        dispatch(fetchPremiumStatus());
      }
    } else {
      if (isPremium) {
        dispatch(addPremiumStatus(false));
        localStorage.removeItem('premium');
        localStorage.removeItem('theme');
        if (isDarkTheme) {
          dispatch(toggleTheme());
        }
      }
    }
  }, [total]);

  const handleLogout = () => {
    dispatch(resetPremiumState());
    dispatch(logout());
    navigate('/login');
  };

  const activePremiumHandler = async () => {
    if (isPremium) {
      await dispatch(addPremiumStatus(false));
      localStorage.removeItem('premium');
      localStorage.removeItem('theme');
      if (isDarkTheme) {
        dispatch(toggleTheme());
      }
    } else {
      await dispatch(addPremiumStatus(true));
    }
  };

  const themeHandler = async () => {
    await dispatch(toggleTheme());
  };

  return (
    <div className={`expense-header ${isDarkTheme ? 'dark-theme' : ''}`}>
      <div className="header-top">
        <h1>Day To Day Expense Tracker</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <p className="profile-warning">
        Your profile is not complete. <Link to="/update-details">Complete now</Link>
      </p>

      <div className="expense-summary">
        <div>
          <h4>
            Total Expense: <span className="highlight">${total}</span>
          </h4>
          {total >= 10000 && (
            <button className="premium-btn" onClick={activePremiumHandler}>
              {isPremium ? 'Cancel Premium' : 'Activate Premium'}
            </button>
          )}
        </div>
        {isPremium && (
          <>
            <CSVLink
              className="csv-download"
              filename="expenses.csv"
              data={listData.map((item, index) => ({
                Number: index + 1,
                Amount: item.amount,
                Description: item.description,
                Category: item.category,
                Date: item.date ? new Date(item.date).toLocaleDateString() : '',
              }))}
            >
              Download Expenses
            </CSVLink>
            <button className="premium-btn" onClick={themeHandler}>
              {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ExpenseFormHeader;
