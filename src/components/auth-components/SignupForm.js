import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupUser, sendVerificationEmail } from '../store/authSlice';

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert('Passwords do not match.');
    }

    try {
      const result = await dispatch(signupUser({ email, password }));

      if (result.type === 'auth/signupUser/fulfilled') {        
        const token = result.payload;
        localStorage.setItem("token",token)
        localStorage.setItem("email",email)
        await dispatch(sendVerificationEmail(token));
        alert("Sign up successful")
        navigate('/confirmEmail');
      }
    } catch (err) {
      alert('Signup failed.');
    }
  };

  return (
    <section className="auth">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="control">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className="actions">
          <a href="/password-reset" className="toggle-signup" style={{ alignSelf: 'flex-end' }}>
            Forgot Password?
          </a>
          <button type="submit">Sign Up</button>
          <a className="toggle-signup" onClick={() => navigate('/login')}>
            Already have an account? Login
          </a>
        </div>
      </form>
    </section>
  );
};

export default SignupForm;
