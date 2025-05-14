import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/authSlice';

import './Login.css';

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);


  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
  
    try {
      const resultAction = await dispatch(loginUser({ email, password }));
  
      if (loginUser.fulfilled.match(resultAction)) {
        navigate('/expense');
        alert("login successfully");
      } else {
        alert(resultAction.payload); 
      }
    } catch (err) {
      alert('Something went wrong!');
    }
  };
  

  return (
    <section className="auth">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="control">
          <input type="email" placeholder="Email" ref={emailRef} required />
          <input type="password" placeholder="Password" ref={passwordRef} required />
        </div>
        <div className="actions">
          <a href="/password-reset" className="toggle-signup" style={{ "align-self": 'flex-end'}}>Forgot Password?</a>
          <button type="submit">Login</button>
          <a className="toggle-signup" onClick={() => navigate('/signup')}>
            Don't have an account? Sign Up
          </a>

        </div>
      </form>
    </section>
  );
};

export default LoginForm;
