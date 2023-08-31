import React from 'react'
import {NavLink} from 'react-router-dom';
import './Header.css'

export default function Header(props) {
  
  function logoutHandler(){
    props.onLogout();
  }
  return (
    <nav className="navbar">
    <div className="container">
      
      <div className="nav-elements">
        <ul>
        <li>
            <NavLink to="/NavigateProfile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Expense</NavLink>
          </li>

           
       
         <div id='cart'>
          
         <li>
            <button id='button' onClick={logoutHandler}><a href='/'>LOGOUT</a></button>
          </li>
          
          </div>
         
        </ul>
      </div>
    </div>
  </nav>
  )
}
