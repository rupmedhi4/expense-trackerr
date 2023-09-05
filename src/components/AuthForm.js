import { useRef, useState} from 'react';
import classes from './AuthForm.module.css';
import { useNavigate} from 'react-router-dom';

const AuthForm = (props) => {
  
  const navigate=useNavigate();
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
localStorage.setItem('email',enterdEmail)
let url;
if(action){
 url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCD3T1zGniDm3GD6469cP9cF4nfy-wADwI'
}
else{
  url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCD3T1zGniDm3GD6469cP9cF4nfy-wADwI'
  
}
const res= await fetch(url,{
  method:'POST',
  body:JSON.stringify({
    email:enterdEmail,
    password:enterdPassword,
    returnSecureToken:true
  }),
  headers:{
    'Content-Type':'application/json'
  }
})
 
if (res.ok) {
  const data = await res.json();
  
  if(action){
    navigate('/expense')
  }
 if(!action){

  try{
    const resVerify= fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCD3T1zGniDm3GD6469cP9cF4nfy-wADwI',{
          method:'POST',
        
          body:JSON.stringify({
            requestType:"VERIFY_EMAIL",
              idToken:data.idToken,
              }),
              
              headers:{
                  'Content-Type':'application/json'
                }
        })
          if(resVerify.ok){
          
            console.log("Success");
           
          }
         }
          catch (error) {
            console.error('Error updating account:', error);
  
          }
          navigate('/confirmEmail')
 }
  await props.onLogin(data.idToken);
 
} else {
  alert('Authentication failed!')
}

}
        
  return (
    <section className={classes.auth}>
      <h1>{!action?"Sign Up":"Login"}</h1>
      <div>
      <div>
      
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
       
        <button  id='log' onClick={submitHandler}>{!action?'Sign Up':'Login'}</button>
        <div className={classes.actions} onClick={signUpHandle}>
          <button type='button' className={classes.toggle} >
          {!action? 'Have an account?Login':"Don't have an account?Sign Up"}
          </button>
       </div>
       
      </div>
      </div>
      
    </section>
  );
};

export default AuthForm;
