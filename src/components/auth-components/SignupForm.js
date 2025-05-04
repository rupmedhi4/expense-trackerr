import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const SignupForm = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      return alert('Passwords do not match.');
    }

    const apiKey = 'AIzaSyCD3T1zGniDm3GD6469cP9cF4nfy-wADwI';
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Signup failed!');

      await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
          requestType: 'VERIFY_EMAIL',
          idToken: data.idToken,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      dispatch(login(token));
      localStorage.setItem("token", token);
      navigate('/confirmEmail');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className="auth">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="control">
        <input type="email" placeholder="Email" ref={emailRef} required />
        <input type="password" placeholder="Password" ref={passwordRef} required />
        <input type="password" placeholder="Confirm Password" ref={confirmPasswordRef} required />
        <div className="actions">
          <a href="/password-reset" className="toggle-signup" style={{ "align-self": 'flex-end' }}>Forgot Password?</a>
          <button type="submit" >Sign Up</button>
          <a className="toggle-signup" onClick={() => navigate('/login')}>
            Already have an account? Login
          </a>

        </div>
      </form>
    </section>
  );
};

export default SignupForm;
