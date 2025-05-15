import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginCard.css';

const LoginCard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message on form submission

    // Basic validation
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save JWT token in localStorage
        localStorage.setItem('token', data.token);
        // Redirect to a protected route (example: dashboard)
        navigate('/');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Server error, please try again later.');
    }
  };

  return (
    <div className="login__card__container">
      <div className="login__card">
        <div className="login__header">
          <h1>Login</h1>
        </div>
        <div className="login__inputs">
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="email__input__container input__container">
              <label className="email__label input__label">Email</label>
              <input
                type="email"
                className="email__input login__input"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="password__input__container input__container">
              <label className="password__label input__label">Password</label>
              <input
                type="password"
                className="password__input login__input"
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login__button__container">
              <button className="login__button" type="submit">
                LOGIN
              </button>
            </div>
          </form>
        </div>
        <div className="login__other__actions">
          <div className="login__forgot__password">Forgot password?</div>
          <div className="login__new__account">
            Don't have an account? <Link to="/account/register">Create account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
