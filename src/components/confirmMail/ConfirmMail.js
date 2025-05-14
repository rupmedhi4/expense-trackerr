import React, { useEffect, useState } from 'react';
import './ConfirmMail.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const apiKey = 'AIzaSyCD3T1zGniDm3GD6469cP9cF4nfy-wADwI';

export default function ConfirmMail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const userInfoUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`;

    const checkEmailVerified = async () => {
      try {
        const response = await axios.post(userInfoUrl, {
          idToken: token,
        });

        const isVerified = response.data.users[0].emailVerified;

        if (isVerified) {
          localStorage.setItem("email-verified", "true");
          setEmailVerified(true);
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error checking verification:", error);
        alert("something went wrong")
      }
    };

    const intervalId = setInterval(checkEmailVerified, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const proceedToGoHandler = () => {
    if (emailVerified) {
      navigate("/expense");
    } else {
      alert("Please verify your email");
    }
  };

const logOutHandler =()=>{
   dispatch(logout());
   navigate("/login");
}

  return (
    <div className="confirm-container">
    <button className='btn btn-primary' onClick={logOutHandler}>logout</button>
      <div className="confirm-card">
        {emailVerified ? (
          <div>
            <h1>Your Account is Successfully Verified ✅</h1>
            <button className="proceed-btn" onClick={proceedToGoHandler}>
              Proceed To Go
            </button>
          </div>
        ) : (
          <div>
            <h1>Account Confirmation</h1>
            <p>We've sent a confirmation link to your email.</p>
            <p>Please check your inbox and click the link to verify your account.</p>
            <button className="proceed-btn" onClick={proceedToGoHandler}>
              Proceed To Go
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
