import React from "react";
import AuthForm from "./components/AuthForm";
import { Route, Routes } from "react-router-dom";
import ConfirmEmail from "./components/ConfirmEmail";
import NavigateProfile from "./components/NavigateProfile";
import Profile from "./components/Profile";
import LoginForm from "./components/LoginForm";
function App() {
  return (
 <div>

<Routes>
  <Route path="/" element={<AuthForm/>}></Route>
  <Route path="/NavigateProfile" element={<NavigateProfile></NavigateProfile>}></Route>
  <Route path="/profile" element={<Profile></Profile>}></Route>
  <Route path="/confirmEmail" element={<ConfirmEmail></ConfirmEmail>}></Route>
  <Route path="/LoginForm" element={<LoginForm></LoginForm>}></Route>
</Routes>
 </div>

  );
}

export default App;
