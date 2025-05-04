import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import PasswordReset from "./components/resetPassword/PasswordReset";
import SignupForm from "./components/auth-components/SignupForm";
import LoginForm from "./components/auth-components/LoginForm";
import UpdateDetails from "./components/updateDetails/UpdateDetails";
import Expenses from './components/expenseForm/Expenses';
import ConfirmMail from "./components/confirmMail/ConfirmMail";
import { useSelector } from "react-redux";


function App() {

  const isLogin = useSelector(state => state.auth.isLogin);
  

  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      {isLogin && 
            <Route path="/confirmEmail" element={<ConfirmMail />}
      />}
      <Route path="/expense" element={<Expenses />} />
      <Route path="/update-details" element={<UpdateDetails />} />
      <Route path="/password-reset" element={<PasswordReset />} />
    </Routes>
  );
}

export default App;
