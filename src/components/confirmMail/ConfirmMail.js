import React from 'react';
import './ConfirmMail.css';
import { useNavigate } from 'react-router-dom';

export default function ConfirmMail() {
  const navigate = useNavigate();

  return (
    <div className="confirm-container">
      <div className="confirm-card">
        <h1>Account Confirmation</h1>
        <p>We've sent a confirmation link to your email.</p>
        <p>Please check your inbox and click the link to verify your account.</p>
        <button className="proceed-btn" onClick={() => navigate('/login')}>Proceed to Login</button>
      </div>
    </div>
  );
}
