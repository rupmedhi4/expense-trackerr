import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses, calculateTotal } from '../store/expenseSlice';
import { logout } from '../store/authSlice';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';
import './ExpenseFormHeader.css';

const ExpenseFormHeader = ({ toggleTheme, isDarkTheme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const total = useSelector((state) => state.expenses.totalExpense);
  const listData = useSelector((state) => state.expenses.listData);

  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const isPremiumActive = localStorage.getItem('premium') 
    if(isPremiumActive) setIsPremium(true);
    
    const loadData = async () => {
      try {
        await dispatch(fetchExpenses());
        await dispatch(calculateTotal());
      } catch (error) {
        alert(' Try again.');
      }
    };

    loadData();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const activePremiumHandler = () => {
    localStorage.setItem('premium', 'active');
    setIsPremium(true);
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
        Your profile is not complete.{' '}
        <a href="/update-details">Complete now</a>
      </p>

      <div className="expense-summary">
        <div>
          <h4>
            Total Expense: <span className="highlight">${total}</span>
          </h4>
          {total >= 10000 && !isPremium && (
            <button className="premium-btn" onClick={activePremiumHandler}>
              Activate Premium
            </button>
          )}
        </div>
        {isPremium && (
          <>
            <CSVLink className="csv-download" data={listData}>
              Download CSV
            </CSVLink>
            <button className="premium-btn" onClick={toggleTheme}>
              {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ExpenseFormHeader;