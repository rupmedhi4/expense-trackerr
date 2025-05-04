import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
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
  
    const apiKey = 'AIzaSyCD3T1zGniDm3GD6469cP9cF4nfy-wADwI';
    const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    const userInfoUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`;
  
    try {
      // Step 1: Sign in
      const res = await fetch(signInUrl, {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      const data = await res.json();
  
      if (!res.ok) throw new Error(data.error?.message || 'Login failed!');
  
      const idToken = data.idToken;
  
      // ✅ Step 2: Lookup user info to get emailVerified
      const userRes = await fetch(userInfoUrl, {
        method: 'POST',
        body: JSON.stringify({ idToken }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      const userData = await userRes.json();
      const emailVerified = userData.users?.[0]?.emailVerified;
  
      if (!emailVerified) {
        alert('Please verify your email before logging in.');
        return;
      }
  
      // Login successful
      console.log(idToken);
      
      dispatch(login(idToken));
      localStorage.setItem("token", idToken);
      navigate('/expense');
  
    } catch (err) {
      alert(err.message);
    }
  };
  
  const goToSignup = () => {
    navigate('/signup');
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
