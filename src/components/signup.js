import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

function Signup() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    statecode: '',
    countrycode: ''
  });
  const [signupMessage, setSignupMessage] = useState('');

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const signup = (event) => {
    event.preventDefault();
      console.log(JSON.stringify(user));
      console.log(user);
    fetch('http://localhost:8080/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Signup failed');
      })
      .then((data) => {
        setSignupMessage('Signup successful!');
      })
      .catch((err) => {
        setSignupMessage('Signup failed. Please try again.');
        console.error('Signup failed:', err);
      });
  };

  return (
    <div className="App">
      <div class="container">
        <h1>Sign Up</h1>
        <form id="signup" onSubmit={signup}>
          <div class="formgroup">
            <label id="username">Username</label>
            <input type="text" id="name" name="name" value={user.name} onChange={onChange} required />
          </div>
          <div class="form-group">
            <label id="email">Email</label>
            <input type="email" id="email" name="email" value={user.email} onChange={onChange} required />
          </div>
          <div class="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={user.password} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" value={user.city} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="statecode">State Code</label>
            <input type="text" id="statecode" name="statecode" value={user.statecode} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="countrycode">Country Code</label>
            <input type="text" id="countrycode" name="countrycode" value={user.countrycode} onChange={onChange} />
          </div>
          <button type="submit">Create</button>
          <Link to="/" className="back-link">Go Back</Link>
        </form>
        {signupMessage && <p>{signupMessage}</p>}
      </div>
    </div>
  );
}

export default Signup;
