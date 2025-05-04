import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense, calculateTotal } from '../store/expenseSlice';
import ShowingExpenses from './ShowingExpenses';
import './ExpenseForm.css';



let userEmail = localStorage.getItem('email');

if (userEmail) {
  userEmail = userEmail.replace('@', '').replace('.', '');
} else {
  console.error('User email is missing in localStorage');
}



const ExpenseForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    date: '',
    category: '',
    description: '',
    amount: ''
  });
  console.log(data);
  
  const [isEdit, setIsEdit] = useState(false);

  function handle(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function listHandler(e) {
    e.preventDefault();
  
    const { id, ...expenseData } = data;
  
    if (isEdit && id) {
      // Update expense in Firebase
      fetch(`https://expence-tracker-c3991-default-rtdb.firebaseio.com/${userEmail}/${id}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(expenseData)
      })
      .then(res => res.json())
      .then(() => {
        dispatch(calculateTotal());
      })
      .catch(err => {
        console.error("Error updating expense:", err);
      });
  
      setIsEdit(false);
    } else {
      // Add new expense
      dispatch(addExpense(data)).then(() => {
        dispatch(calculateTotal());
      });
    }
  
    setData({ date: '', category: '', description: '', amount: '' });
  }
  

  return (
    <>
      <h1>Expense Tracker</h1>

      <form className='expense-form' onSubmit={listHandler}>
        <div className='form-group'>
          <label>Category</label>
          <select name='category' value={data.category} onChange={handle} required>
            <option value="">Select</option>
            <option value="Bills & EMI's">Bills & EMI's</option>
            <option value="Sports">Sports</option>
            <option value="Electronics">Electronics</option>
            <option value="Travel">Travel</option>
            <option value="Hospital">Hospital</option>
            <option value="Groceries">Groceries</option>
            <option value="Books and Education">Books and Education</option>
            <option value="Home,Furniture and Appliances">Home,Furniture and Appliances</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className='form-group'>
          <label>Amount</label>
          <input
            type='number'
            name='amount'
            value={data.amount}
            onChange={handle}
            required
          />
        </div>

        <div className='form-group'>
          <label>Description</label>
          <input
            type='text'
            name='description'
            value={data.description}
            onChange={handle}
            placeholder="e.g. Grocery Shopping"
            required
          />
        </div>

        <div className='form-group'>
          <label>Date</label>
          <input
            type='date'
            name='date'
            value={data.date}
            onChange={handle}
            required
          />
        </div>

        <div className='form-actions'>
          <button type='submit'>{isEdit ? 'Update Expense' : 'Add Expense'}</button>
        </div>
      </form>

      <ShowingExpenses  setData={setData} setIsEdit={setIsEdit}  />
    </>
  );
};

export default ExpenseForm;
