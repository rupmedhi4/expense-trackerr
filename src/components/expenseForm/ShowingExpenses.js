import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExpense, calculateTotal } from '../store/expenseSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ShowingExpenses.css'; // Importing the CSS file

let userEmail = localStorage.getItem('email');

if (userEmail) {
  userEmail = userEmail.replace('@', '').replace('.', '');
} else {
  console.error('User email is missing in localStorage');
}

export default function ShowingExpenses({ setData, setIsEdit }) {
  const dispatch = useDispatch();
  const listData = useSelector(state => state.expenses.listData);
  const navigate = useNavigate();

  const remove = (id) => {
    dispatch(deleteExpense(id)).then(() => {
      dispatch(calculateTotal());
    });
  };

  console.log(listData);
  
  const editHandler = async (id) => {
    try {
      setIsEdit(true);
      console.log(listData);
      
      const res = listData.find((item)=>item.id === id)
      if (res) {
        setData({
          date: res.date ,
          category: res.category ,
          description: res.description ,
          amount: res.amount ,
          id: res.id
        });
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="expense-table-container">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listData.map((item) => (
           
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.category}</td>
              <td>{item.description}</td>
              <td>{item.amount}</td>
              <td>
                <button className="edit-btn" onClick={() => editHandler(item.id)}>Edit</button>
                <button className="delete-btn" onClick={() => remove(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
