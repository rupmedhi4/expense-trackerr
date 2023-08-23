import React,{useContext, useRef,useEffect} from 'react'
import './Profile.css';
import { FaGithub } from "react-icons/fa6";
import {FiGlobe} from "react-icons/fi";
import AuthContext from './store/AuthContext';

export default function Profile() {
  
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
       
            if (users && users.length > 0) {
              const [{ displayName, photoUrl }] = users;
              nameRef.current.value = displayName;
              imageRef.current.value = photoUrl;
            }
          } else {
            alert('Response not okay');
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
        Winners never quite,Quitters never win.
        <div className='profileStatus'>
         Your profile is <span className='percent'>64%</span> completed. A complete profile has higher chances of landing a job.<a href='#'>complete now</a>
        </div>
      </div>
      <hr></hr>
    <div className='details' >
        <div className='contact'>
        <h1>Contact Details</h1>
        <button className='cancel'>Cancel</button>
        <a href='/'><button className='logout' onClick={logOutHandler} >Logout</button></a>
        </div>
        
        <div className='form'>
        <label htmlFor='name'><span><FaGithub/></span>Name:</label>
        <input type='text' name='name' className='input' ref={nameRef}></input>
        <label htmlFor='photo'><span><FiGlobe/></span>Profile Photo URL:</label>
        <input type='text' name='img' className='input' ref={imageRef}></input>
        </div>
        <button className='btn' onClick={submitHandler}>Update</button>
    </div>
    </div>
  )
}
