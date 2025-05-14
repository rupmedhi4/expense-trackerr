import React from "react";
import { Routes, Route } from "react-router-dom";
import PasswordReset from "./components/resetPassword/PasswordReset";
import SignupForm from "./components/auth-components/SignupForm";
import LoginForm from "./components/auth-components/LoginForm";
import UpdateDetails from "./components/updateDetails/UpdateDetails";
import Expenses from "./components/expenseForm/Expenses";
import ConfirmMail from "./components/confirmMail/ConfirmMail";
import PrivateRoute from "./PrivateRoute";
import AuthPrivateRoute from "./AuthPrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <AuthPrivateRoute>
          <LoginForm />
        </AuthPrivateRoute>
      } />
      <Route
        path="/login"
        element={
          <AuthPrivateRoute>
            <LoginForm />
          </AuthPrivateRoute>
        } />
      <Route
        path="/signup"
        element={
          <AuthPrivateRoute>
            <SignupForm />
          </AuthPrivateRoute>
        } />
      <Route
        path="/password-reset"
        element={
          <AuthPrivateRoute>
            <PasswordReset />
          </AuthPrivateRoute>
        } />
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
