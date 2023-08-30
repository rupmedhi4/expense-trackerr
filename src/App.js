import React from "react";
import AuthForm from "./components/AuthForm";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector from react-redux
import { login,logout } from "./components/store/authSlice"; // Import actions from your authSlice
import ConfirmEmail from "./components/ConfirmEmail";
import NavigateProfile from "./components/NavigateProfile";
import Profile from "./components/Profile";
import PasswordReset from "./components/PasswordReset";
import Update from "./components/Update";
import LoginForm from "./components/LoginForm";
function App() {
  const dispatch = useDispatch(); // Get the dispatch function
 

  const handleLogin = (token) => {
    // Simulate a successful login and get the token from some source
    dispatch(login(token)); // Dispatch the login action
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    localStorage.removeItem("token");
  };

  return (
    <div>
      <Routes>
 <Route path="/" element={<AuthForm onLogin={handleLogin}/>}></Route>
 <Route path="/NavigateProfile" element={<NavigateProfile/>}></Route>
 <Route path="/profile" element={<Profile onLogout={handleLogout}/>}></Route>
<Route path="/confirmEmail" element={<ConfirmEmail/>}></Route>
<Route path="/LoginForm" element={<LoginForm onLogin={handleLogin}/>}></Route>
<Route path="/update/:id" element={<Update/>}></Route>
<Route path="/PasswordReset" element={<PasswordReset/>}></Route>
  <Route path="*" element={<Navigate to="/" />} />
</Routes>
    </div>
  );
}

export default App;