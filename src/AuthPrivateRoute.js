import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthPrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const emailVerified = localStorage.getItem('email-verified');
  const email = localStorage.getItem('email');

  if (token && email || emailVerified) {
    return <Navigate to="/expense" />;
  } 

  return children
}



export default AuthPrivateRoute;
