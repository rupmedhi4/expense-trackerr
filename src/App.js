import React from "react";
import { Routes, Route } from "react-router-dom";
import PasswordReset from "./components/resetPassword/PasswordReset";
import SignupForm from "./components/auth-components/SignupForm";
import LoginForm from "./components/auth-components/LoginForm";
import UpdateDetails from "./components/updateDetails/UpdateDetails";
import Expenses from "./components/expenseForm/Expenses";
import ConfirmMail from "./components/confirmMail/ConfirmMail";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/password-reset" element={<PasswordReset />} />
      <Route
        path="/confirmEmail"
        element={
          <PrivateRoute>
            <ConfirmMail />
          </PrivateRoute>
        }
      />
      <Route
        path="/expense"
        element={
          <PrivateRoute>
            <Expenses />
          </PrivateRoute>
        }
      />
      <Route
        path="/update-details"
        element={
          <PrivateRoute>
            <UpdateDetails />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
