import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses, calculateTotal } from '../store/expenseSlice';
import { logout } from '../store/authSlice';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';
import './ExpenseFormHeader.css'; // Importing styles

const ExpenseFormHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const total = useSelector(state => state.expenses.totalExpense);
  const listData = useSelector(state => state.expenses.listData);

  useEffect(() => {
    dispatch(fetchExpenses()).then(() => {
      dispatch(calculateTotal());
    });
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="expense-header">
      <div className="header-top">
        <h1>💰 Day To Day Expense Tracker</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <p className="profile-warning">
        ⚠️ Your profile is not complete. <a href="/update-details">Complete now</a>
      </p>

      <div className="expense-summary">
        <h4>Total Expense: <span className="highlight">${total}</span></h4>
        <CSVLink className="csv-download" data={listData}>⬇️ Download CSV</CSVLink>
      </div>
    </div>
  );
};

export default ExpenseFormHeader;
