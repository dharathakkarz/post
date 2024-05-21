import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email === email);

    if (user && user.password === password) {

      navigate('/');
    } else {
   
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {error && <p>{error}</p>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
