import React from 'react';
import './ConfirmEmail.css';
export default function ConfirmEmail() {
  return (
    <div className='confirm'>
      <h1>Account Confirmation</h1>
      <p>An email with your account confirmation link has been sent to your email</p>
      <p>Check your email and come back to proceed!</p>
     <a href='/LoginForm'><button className='proceed'>Proceed</button></a>
    </div>
  )
}
