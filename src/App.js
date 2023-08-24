import React, { useContext } from "react";
import AuthForm from "./components/AuthForm";
import { Route, Routes,Navigate } from "react-router-dom";
import ConfirmEmail from "./components/ConfirmEmail";
import NavigateProfile from "./components/NavigateProfile";
import Profile from "./components/Profile";
import LoginForm from "./components/LoginForm";
import PasswordReset from "./components/PasswordReset";
import AuthContext from "./components/store/AuthContext";
function App() {
  const  context=useContext(AuthContext);
  return (
 <div>

<Routes>
 {!context.isLogin &&<Route path="/" element={<AuthForm/>}></Route>}
  {context.isLogin &&<Route path="/NavigateProfile" element={<NavigateProfile></NavigateProfile>}></Route>}
  {context.isLogin &&<Route path="/profile" element={<Profile></Profile>}></Route>}
  {context.isLogin &&<Route path="/confirmEmail" element={<ConfirmEmail></ConfirmEmail>}></Route>}
  {context.isLogin &&<Route path="/LoginForm" element={<LoginForm></LoginForm>}></Route>}
  {!context.isLogin &&<Route path="/PasswordReset" element={<PasswordReset></PasswordReset>}></Route>}
  <Route path="*" element={<Navigate to="/" />} />
</Routes>
 </div>

  );
}

export default App;
