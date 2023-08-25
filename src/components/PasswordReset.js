import React, { useRef } from 'react'
import './PassWordReset.css'
export default function PasswordReset() {
    const emailRef=useRef();
   
    async function submitHandler(event){
        event.preventDefault();
        const email=emailRef.current.value;
        if(emailRef.current.value===""){
            alert('Enter email')
        }
    try{
        const resetPassword= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAQYXLrWSQR8lxbt1sc-ye5bGOTDsYKzQM',{
              method:'POST',
            
              body:JSON.stringify({
                requestType:"PASSWORD_RESET" ,
                email:email
                  }),
                  
                  headers:{
                      'Content-Type':'application/json'
                    }
            })
              const data=resetPassword.json();
            localStorage.setItem('email',email)

            } 
              catch (error) {
                console.error('Error updating account:', error);
      
              }
            }
       
  return (
    <div className='resetPassword'>
      <h1>Reset Your Password</h1>
      <hr></hr>
      <p>Lost your password? Please enter your email address. You will receive a link to create new password via email.</p>
      <label htmlFor='email'>Email:</label>
      <input type='email' id='email' className='input' placeholder='Enter email' ref={emailRef} required />
      <button className='reset' onClick={submitHandler}>RESET PASSWORD</button>
    </div>
  )
}
