import React, { useRef, useState } from 'react';
import './PasswordReset.css';

export default function PasswordReset() {
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);

  async function submitHandler(event) {
    event.preventDefault();
    const email = emailRef.current.value;

    if (!email) {
      alert('Please enter your email address.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCD3T1zGniDm3GD6469cP9cF4nfy-wADwI',
        {
          method: 'POST',
          body: JSON.stringify({
            requestType: 'PASSWORD_RESET',
            email: email,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert('Password reset link sent to your email.');
      } else {
        alert(data.error.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="reset-container">
      <form className="reset-form" onSubmit={submitHandler}>
        <h2>🔐 Reset Your Password</h2>
        <p>
          Lost your password? Enter your email and we’ll send you a reset link.
        </p>
        <input
          type="email"
          ref={emailRef}
          placeholder="Enter your email"
          className="reset-input"
          required
        />
        <button type="submit" className="reset-button" disabled={loading}>
          {loading ? 'Sending...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}
