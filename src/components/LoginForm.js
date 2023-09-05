import React, { useRef,useEffect } from 'react'
import classes from './Login.module.css';
import { useSelector } from 'react-redux';

import { useNavigate} from 'react-router-dom';
export default function LoginForm(props) {
  const token = useSelector(state => state.token);
    const navigate=useNavigate();
    const emailRef=useRef();
  const passwordRef=useRef();
   function submitHandler(event){
    event.preventDefault();
    
    const enterdEmail=emailRef.current.value;
    const enterdPassword=passwordRef.current.value;
    
     let url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCD3T1zGniDm3GD6469cP9cF4nfy-wADwI'
    
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
      .then((data)=>{
       
        props.onLogin(data.idToken);
        
        console.log("succes");
      })
      .catch((err)=>{
        alert(err.message);
      })
      
       
  }
  useEffect(() => {
    const updateAccount = async () => {
      try {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCD3T1zGniDm3GD6469cP9cF4nfy-wADwI', {
          method: 'POST',
          body: JSON.stringify({
            idToken: token,
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const responseData = await response.json();
          const users = responseData.users[0];
            
     
     if(users.emailVerified===false){
      alert('Please verify your email to login')
     }
     else if(users.emailVerified===true){
      navigate('/NavigateProfile')
     }
          
        } else {
         console.log('Response not okay');
        }
      } catch (error) {
        console.error('Error updating account:', error);
      }
    }

    if (token) {
      updateAccount();
    
    }
  }, [token,navigate]);

   
  return (
    <div>
       <section className={classes.auth}>
      <h1>Login</h1>
      <div>
      <form onSubmit={submitHandler}>
      
        <div className={classes.control}>
         
          <input type='email' id='email' placeholder='Email' ref={emailRef} required />
        </div>
        <div className={classes.control}>
          
        <input
            type='password'
            id='password'
            placeholder='Password'
            ref={passwordRef}
            required
          />
        </div>
    
        <button  id='log'>Login</button>
        
      </form>
      </div>
      
    </section>
    </div>
  )
}
