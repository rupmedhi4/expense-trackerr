import React from 'react'
import './NavigateProfile.css'
export default function Profile() {
  return (
    <div>
    <div className='profile'>
      <h1 className='welcome'>Welcome To Expence Tracker!!!</h1>
     <div className='incomplete'>
        Your profile is incomplete.<a href='/profile'>complete now</a>
     </div>
    </div>
    <hr></hr>
    </div>
  )
}
