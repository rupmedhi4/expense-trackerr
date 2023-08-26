import React, { useEffect,useState } from 'react'
import './Update.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
export default function Update() {
  const navigate=useNavigate();
    const { id } = useParams();
    console.log(id);
    const [expenseData, setExpenseData] = useState({
      date: '',
      category: '',
      description: '',
      amount: '',
    });
    function handle(e){
      let name=e.target.name;
      let value=e.target.value;
      setExpenseData({...expenseData,[name]:value})
      }
  
    useEffect(() => {
      axios
        .get(`https://expence-tracker-c3991-default-rtdb.firebaseio.com/expense/${id}.json`)
        .then((response) => {
            
          console.log(response);
          setExpenseData({...expenseData,date:response.data.date,category:response.data.category,description:response.data.description,
                         amount:response.data.amount});
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
    }, [id]);
    
    function submitHandler(e){
     
        e.preventDefault();
        fetch(`https://expence-tracker-c3991-default-rtdb.firebaseio.com/expense/${id}.json`, {
          method: 'PUT',
          body: JSON.stringify(expenseData),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          navigate('/profile');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
          
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    }
  
  return (
    <div>
     <div id="form">
              <div className='new-expense__controls'>
                   <div className='new-expense__control'>
                   <label>Category: </label>
                  <select type='select'  name='category' value={expenseData.category} onChange={handle}>
                  <option value="select">Select</option>
                   <option value="Bills and EMI's">Bills and EMI's</option>
                    <option value="Sports">Sports</option>
                     <option value="Travel">Travel</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Books and Education">Books and Education</option>
                    <option value="Home,Furniture and Appliances">Home,Furniture and Appliances</option>
                    <option value="Others">Others</option>
                    </select>
                    <label>Amount: </label>
                    <input type='number'  name='amount' value={expenseData.amount} onChange={handle}></input>
                   </div>
                   <div className='new-expense__control'>
                    <label>Description: </label>
                    <input type='text' name='description' value={expenseData.description} onChange={handle}></input>
                   </div>
                   <div className='new-expense__control'>
                    <label>Date: </label>
                    <input type='date' min="2019-1-1" max="2023-12-31"  name='date' value={expenseData.date} onChange={handle}></input>
                   </div>
                   <div className='new-expense__control'>
                 <input type='button' className="data" value="Add Expense" onClick={submitHandler} ></input>
               
                   </div>
                   </div>
              </div>
    </div>
  )
}
