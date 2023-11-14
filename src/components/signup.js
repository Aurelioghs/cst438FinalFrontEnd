import React, { useState } from 'react';
import Game from './Game.js';

function Signup() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    city: '',
    stateCode: '',
    countryCode: ''
  });

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const signup = () => {
    fetch('http://localhost:8080/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then((res) => {
        // Handle response as needed (e.g., redirect to login page)
        console.log('Signup successful!', res);
      })
      .catch((err) => {
        console.error('Signup failed:', err);
      });
  };

  return (
    <div className="App">
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="username">Username</label>
            </td>
            <td>
              <input type="text" name="username" value={user.username} onChange={onChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="email">Email</label>
            </td>
            <td>
              <input type="text" name="email" value={user.email} onChange={onChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="password">Password</label>
            </td>
            <td>
              <input type="password" name="password" value={user.password} onChange={onChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="city">City</label>
            </td>
            <td>
              <input type="text" name="city" value={user.city} onChange={onChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="stateCode">State Code</label>
            </td>
            <td>
              <input type="text" name="stateCode" value={user.stateCode} onChange={onChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="countryCode">Country Code</label>
            </td>
            <td>
              <input type="text" name="countryCode" value={user.countryCode} onChange={onChange} />
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <button id="submit" onClick={signup}>
        Sign Up
      </button>
    </div>
  );
}

export default Signup;
