import React from 'react'
import './NavigateProfile.css'
export default function Profile() {
  return (
    <div>
    <div className='profile'>
      Welcome to expence tracker!!!
     <div className='incomplete'>
        Your profile is incomplete.<a href='/profile'>complete now</a>
     </div>
    </div>
    <hr></hr>
    </div>
  )
}
