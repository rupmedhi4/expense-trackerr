import {useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  
  const emailRef=useRef();
  const passwordRef=useRef();

 function submitHandler(event){
event.preventDefault();

const enterdEmail=emailRef.current.value;
const enterdPassword=passwordRef.current.value;


 let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQYXLrWSQR8lxbt1sc-ye5bGOTDsYKzQM'

fetch(url,{
    method:'POST',
    body:JSON.stringify({
      email:enterdEmail,
      password:enterdPassword,
      returnSecureToken:true
    }),
    headers:{
      'Content-Type':'application/json'
    }
  }).then((res)=>{
    if(res.ok){
return res.json();
    }else{
      return res.json().then((data)=>{
        
        let errorMessage='Authentication failed!';
        
       throw new Error(errorMessage);
      })
    }
  })
  .then(()=>{
    console.log('User has successfully signed up');
  })
  .catch((err)=>{
    alert(err.message);
  })
 }
  return (
    <section className={classes.auth}>
      <h1>Sign Up</h1>
      <div>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
         
          <input type='email' id='email' placeholder='Email' ref={emailRef} required />
        </div>
        <div className={classes.control}>
          
          <input type='password' id='password' ref={passwordRef} placeholder='Password' required/>
        </div>
        <div className={classes.control}>
          
          <input type='password' id='password' ref={passwordRef} placeholder='Confirm Password' required/>
        </div>
       
        <button  id='log'>Sign Up</button>
        <div className={classes.actions}>
          <button type='button' className={classes.toggle} >
           Have an account?Login
          </button>
        </div>
      </form>
      </div>
      
    </section>
  );
};

export default AuthForm;
