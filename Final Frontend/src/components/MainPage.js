
import './MainPage.css';
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';


function MainPage() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [isAuthenticated, setAuth] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const jwtToken = await response.text(); // Get the token from the response body
        if (jwtToken) {
          console.log("Token received:", jwtToken);
          sessionStorage.setItem('jwt', jwtToken);
          setAuth(true);
        } else {
          console.log("Token not received");
        }
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setRedirect(true);
    }
  }, [isAuthenticated]);

  if (redirect) {
    return <Redirect to="/userView" />;
  }

  return (
    <div className="main-page">
      <header>
        <h1>Explore Otter Weather World</h1>
      </header>
      <main>
        <section className="signup-section">
          <h2>Join us Today!</h2>
          <form onSubmit={login}>
            <div className="App">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="username">Username</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={onChange}
                        placeholder="username"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="password">Password</label>
                    </td>
                    <td>
                      <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={onChange}
                        placeholder="password"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <button type="submit" id="submit">Login</button>
            <Link to="/userView" className="user-btn"></Link>
            </div>
          </form>
          <p>
            Create an account{' '}
            <Link to="/signup" className="signup-btn">
              click here
            </Link>
          </p>
        </section>
      </main>
          <section className="container">
          <div className="image-container">
            <img
              className="img-fluid"
              src="/img/image1.png"
              alt="Weather 1"
            />
            <img
              className="img-fluid"
              src="/img/image2.png"
              alt="Weather 2"
            />
            <img
              className="img-fluid"
              src="/img/image3.png"
              alt="Weather 3"
            />
             <img
              className="img-fluid"
              src="/img/image4.png"
              alt="Weather 4"
            />
          </div>
        </section>
      <footer>
        <p>&copy; 2023 CST438 CSUMB.</p>
      </footer>
    </div>
  );
}

export default MainPage;
