import {useContext, useRef, useState } from 'react';
import AuthContext from './store/AuthContext';
import classes from './AuthForm.module.css';
import { useNavigate} from 'react-router-dom';

const AuthForm = () => {
  const navigate=useNavigate();
  const context=useContext(AuthContext);
  const[action,setAction]=useState(true);
  const emailRef=useRef();
  const passwordRef=useRef();

  function signUpHandle(){
    setAction((data)=>
    !data);
  }
 async function submitHandler(event){
event.preventDefault();

const enterdEmail=emailRef.current.value;
const enterdPassword=passwordRef.current.value;
let url;
if(action){
 url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQYXLrWSQR8lxbt1sc-ye5bGOTDsYKzQM'
}
else{
  url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQYXLrWSQR8lxbt1sc-ye5bGOTDsYKzQM'
  
}
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
 
  context.login(data.idToken);
  navigate("/confirmEmail")
  console.log("succes");
})
.catch((err)=>{
  alert(err.message);
})
try{
  fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAQYXLrWSQR8lxbt1sc-ye5bGOTDsYKzQM',{
        method:'POST',
      
        body:JSON.stringify({
          requestType:"VERIFY_EMAIL",
            idToken:context.token,
            }),
            
            headers:{
                'Content-Type':'application/json'
              }
      }).then((resVerify)=>{
        if(resVerify.ok){
            
         
    return resVerify.json();
        }else{
          return resVerify.json().then((data)=>{
            
           alert('Not verify')
          })
        }
      })
      .then((data)=>{
       
        
        console.log("succes");
      })
    }
        catch (error) {
          console.error('Error updating account:', error);

        }
 
 }
  return (
    <section className={classes.auth}>
      <h1>{!action?"Sign Up":"Login"}</h1>
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
        {!action? <div className={classes.control}>
          
        <input
            type='password'
            id='password'
            ref={passwordRef}
            placeholder='Confirm password'
            required
          />
        </div>:<div></div>}
       <div className={classes.reset}>
        <a href='/PasswordReset'>Forgot password?</a>
       </div>
       
        <button  id='log'>{!action?'Sign Up':'Login'}</button>
        <div className={classes.actions} onClick={signUpHandle}>
          <button type='button' className={classes.toggle} >
          {!action? 'Have an account?Login':"Don't have an account?Sign Up"}
          </button>
       </div>
       
      </form>
      </div>
      
    </section>
  );
};

export default AuthForm;
