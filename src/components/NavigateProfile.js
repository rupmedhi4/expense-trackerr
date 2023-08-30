import React,{useRef,useEffect} from 'react'
import './NavigateProfile.css'
import { FaGithub } from "react-icons/fa6";
import {FiGlobe} from "react-icons/fi";
import { TbArrowBigRightLineFilled } from "react-icons/tb";
import { useSelector } from 'react-redux';
export default function NavigateProfile() {
  
  const token = useSelector(state => state.token);
  const nameRef=useRef();
     const imageRef=useRef();

     async function submitHandler(event){
      event.preventDefault();
      if(nameRef.current.value==="" ||imageRef.current.value===""){
alert('Enter full details');
      }
   const res= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAQYXLrWSQR8lxbt1sc-ye5bGOTDsYKzQM',{
      method:'POST',
    
      body:JSON.stringify({
        displayName:nameRef.current.value,
        photoUrl:imageRef.current.value,
          idToken:token,
          returnSecureToken:true}),
          
          headers:{
              'Content-Type':'application/json'
            }
    })
      if(res.ok){
  alert('profile updated sucessfully')
  console.log(res.json());
  nameRef.current.value = "";
  imageRef.current.value = "";
      }else{
        
    alert('failed')
          
      }  
      
  }
  useEffect(() => {
    const updateAccount = async () => {
      try {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAQYXLrWSQR8lxbt1sc-ye5bGOTDsYKzQM', {
          method: 'POST',
          body: JSON.stringify({
            idToken: token,
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const responseData = await response.json();
          const users = responseData.users;
     
          if (users && users.length > 0 ) {
            const [{ displayName, photoUrl }] = users;
            nameRef.current.value = displayName;
            imageRef.current.value = photoUrl;
          }
        } else {
         console.log('Response not okay');
        }
      } catch (error) {
        console.error('Error updating account:', error);
      }
    }

    if (token) {
      updateAccount();
    }
  }, [token]);

  return (
    <div>
    <div className='profile'>
      <h1 className='welcome'>Welcome To Expence Tracker!!!</h1>
     <div className='incomplete'>
     Your profile is <span className='percent'>64%</span> completed. A complete profile has higher chances of landing a job.<a href='#' >complete now</a>
     </div>
     
    </div>
    <hr></hr>
    <div className='details' >
      
       <form className='form' onSubmit={submitHandler}>
       <div className='contact'>
       <h1>Details:</h1>
      <button className='cancel'>Cancel</button>
       </div>
       <div>
          
        <label htmlFor='name'><span><FaGithub/></span>Name:</label>
        <input type='text' name='name' className='input' ref={nameRef}></input>
        <label htmlFor='photo'><span><FiGlobe/></span>Profile Photo URL:</label>
        <input type='text' name='img' className='input' ref={imageRef}></input>
        </div>
        <button className='btn' >Update</button>
        </form>
        </div>
        <button className='arrow'><a href='/profile'><span><TbArrowBigRightLineFilled></TbArrowBigRightLineFilled></span></a></button>
    </div>
  )
}
