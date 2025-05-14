import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const emailVerified = localStorage.getItem('email-verified');
  const location = useLocation();


  if (!token) {
    return <Navigate to="/login" />;
  }

  if (location.pathname === '/confirmEmail') {
    return children;
  }

  if (emailVerified === 'true') {
    return children;
  } else {
    return <Navigate to="/confirmEmail" />;
  }
};

export default PrivateRoute;
