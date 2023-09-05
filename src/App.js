import React from "react";
import AuthForm from "./components/AuthForm";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { login,logout} from "./components/store/authSlice";
import ConfirmEmail from "./components/ConfirmEmail";
import NavigateProfile from "./components/NavigateProfile";
import Expense from "./components/Expense";
import PasswordReset from "./components/PasswordReset";
import Update from "./components/Update";
import LoginForm from "./components/LoginForm";


function App() {
  const dispatch = useDispatch(); 
const select=useSelector(state=>state.isLogin)
const navigate=useNavigate();
  const handleLogin = (token) => {
    
    dispatch(login(token)); 
 
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {

    dispatch(logout()); 
    navigate('/')
    localStorage.removeItem("token");
  };

  return (
    <div>
   
      <Routes>
 <Route path="/" element={<AuthForm onLogin={handleLogin}/>}></Route>
 <Route path="/NavigateProfile" element={<NavigateProfile/>}></Route>
 <Route path="/expense" element={<Expense onLogout={handleLogout}/>}></Route>
{select &&<Route path="/confirmEmail" element={<ConfirmEmail/>}></Route>}
{select &&<Route path="/LoginForm" element={<LoginForm onLogin={handleLogin}/>}></Route>}
<Route path="/update/:id" element={<Update/>}></Route>
<Route path="/PasswordReset" element={<PasswordReset/>}></Route>
  <Route path="*" element={<Navigate to="/" />} />
</Routes>
    </div>
  );
}

export default App;