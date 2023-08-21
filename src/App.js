import React from "react";
import AuthForm from "./components/AuthForm";
import { Route, Routes } from "react-router-dom";
import NavigateProfile from "./components/NavigateProfile";
import Profile from "./components/Profile";
function App() {
  return (
 <div>

<Routes>
  <Route path="/" element={<AuthForm/>}></Route>
  <Route path="/NavigateProfile" element={<NavigateProfile></NavigateProfile>}></Route>
  <Route path="/profile" element={<Profile></Profile>}></Route>
</Routes>
 </div>

  );
}

export default App;
