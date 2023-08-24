import React,{useContext, useRef,useEffect, useState} from 'react'
import './Profile.css';
import { FaGithub } from "react-icons/fa6";
import {FiGlobe} from "react-icons/fi";
import AuthContext from './store/AuthContext';

export default function Profile() {
  
  const[description,setDescription]=useState('');
  const[amount,setAmount]=useState(null);
  const[date,setDate]=useState('');
  const[category,setCategory]=useState('');
  const[listData,setListData]=useState([]);
  function listHandler(){
    setListData((listData)=>{
const list=([...listData,{category,date,description,amount}]);
setListData(list)
return list;

    })
   
}
const context=useContext(AuthContext);
    const nameRef=useRef();
     const imageRef=useRef();
  
  
     function logOutHandler(){
      context.logout();
     }
    async function submitHandler(event){
        event.preventDefault();
        if(nameRef.current.value==="" ||imageRef.current.value===""){
  alert('Enter full details');
        }
     const res= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAQYXLrWSQR8lxbt1sc-ye5bGOTDsYKzQM',{
        method:'POST',
      
        body:JSON.stringify({
          displayName:nameRef.current.value,
          photoUrl:imageRef.current.value,
            idToken:context.token,
            returnSecureToken:true}),
            
            headers:{
                'Content-Type':'application/json'
              }
      })
        if(res.ok){
    alert('profile updated sucessfully')
    console.log(res.json());
    nameRef.current.value = "";
    imageRef.current.value = "";
        }else{
          
      alert('failed')
            
        }  
        
    }
    useEffect(() => {
      const updateAccount = async () => {
        try {
          const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAQYXLrWSQR8lxbt1sc-ye5bGOTDsYKzQM', {
            method: 'POST',
            body: JSON.stringify({
              idToken: context.token,
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
  
          if (response.ok) {
            const responseData = await response.json();
            const users = responseData.users;
       
            if (users && users.length > 0 ) {
              const [{ displayName, photoUrl }] = users;
              nameRef.current.value = displayName;
              imageRef.current.value = photoUrl;
            }
          } else {
           console.log('Response not okay');
          }
        } catch (error) {
          console.error('Error updating account:', error);
        }
      }
  
      if (context.token) {
        updateAccount();
      }
    }, [context.token]);
    
  return (
    <div>
      <div className='profile'>
        <h1>Winners Never Quite,Quitters Never Win.</h1>
         <div className='profileStatus'>
         Your profile is <span className='percent'>64%</span> completed. A complete profile has higher chances of landing a job.<a href='#' >complete now</a>
        </div>
        
      </div>
      <a href='/'><button className='logout' onClick={logOutHandler} >Logout</button></a>
      <hr></hr>
     
    <div className='details' >
      
       <form className='form' onSubmit={submitHandler}>
       <div className='contact'>
       <h1>Contact Details</h1>
      <button className='cancel'>Cancel</button>
       </div>
       <div>
          
        <label htmlFor='name'><span><FaGithub/></span>Name:</label>
        <input type='text' name='name' className='input' ref={nameRef}></input>
        <label htmlFor='photo'><span><FiGlobe/></span>Profile Photo URL:</label>
        <input type='text' name='img' className='input' ref={imageRef}></input>
        </div>
        <button className='btn' >Update</button>
        </form>
        </div>
        <div id="form" >
              <div className='new-expense__controls'>
                   <div className='new-expense__control'>
                   <label>Category: </label>
                  <select type='select' value={category} onChange={(e)=>{setCategory(e.target.value)}}>
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
                    <input type='number' value={amount} onChange={(e)=>{setAmount(e.target.value)}}></input>
                   </div>
                   <div className='new-expense__control'>
                    <label>Description: </label>
                    <input type='text' value={description} onChange={(e)=>{setDescription(e.target.value)}}></input>
                   </div>
                   <div className='new-expense__control'>
                    <label>Date: </label>
                    <input type='date' min="2019-1-1" max="2023-12-31" value={date} onChange={(e)=>{setDate(e.target.value)}}></input>
                   </div>
                   <div className='new-expense__control'>
                 <input type='button' className="data" value="Add Expense" onClick={listHandler} ></input>
               
                   </div>
                   </div>
              </div>
                <div className='transaction'>
                
              <table>
                <thead>
                <tr className='heading'>
                  <th><h2>Date</h2></th>
                  <th><h2>Category</h2></th>
                  <th><h2>Description</h2></th>
                  <th><h2>Amount</h2></th>
                  </tr>
                </thead>
                <tbody>
              {listData.map((t)=>(
                <tr key={t.id}>
                <td><h3>{t.date}</h3></td>
                <td>{t.category}</td>
                <td>{t.description}</td>
                <td>{t.amount}</td>
                <td><button className='edit'>Edit</button></td>
                <td><button className='delete'>Delete</button></td>
                </tr>
    
              ))}
                </tbody>
              </table>
              </div>
              
    </div>
  
  )
}
