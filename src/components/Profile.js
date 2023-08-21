import React from 'react'
import './Profile.css';
import { FaGithub } from "react-icons/fa6";
import {FiGlobe} from "react-icons/fi";
export default function Profile() {
  return (
    <div>
      <div className='profile'>
        Winners never quite,Quitters never win.
        <div className='profileStatus'>
         Your profile is <span className='percent'>64%</span> completed. A complete profile has higher chances of landing a job.<a href='#'>complete now</a>
        </div>
      </div>
      <hr></hr>
    <div className='details'>
        <div className='contact'>
        <h1>Contact Details</h1>
        <button className='cancel'>Cancel</button></div>
        <div className='form'>
        <label htmlFor='name'><span><FaGithub/></span>Name:</label>
        <input type='text' name='name' className='input'></input>
        <label htmlFor='photo'><span><FiGlobe/></span>Profile Photo URL:</label>
        <input type='text' name='name' className='input'></input>
        </div>
        <button className='btn'>Update</button>
    </div>
    </div>
  )
}
