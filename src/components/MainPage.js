import React, { useState } from 'react';
import './MainPage.css';
import { Link, Redirect } from 'react-router-dom';

function MainPage() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [isAuthenticated, setAuth] = useState(false);

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const login = () => {
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((res) => {
        const jwtToken = res.headers.get('Authorization');
        if (jwtToken !== null) {
          sessionStorage.setItem('jwt', jwtToken);
          setAuth(true);
        }
      })
      .catch((err) => console.log(err));
  };

  // Redirect to CurrentWeather component if authenticated
  if (isAuthenticated) {
    return <Redirect to="/CurrentWeather" />;
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
                        type="text" name="username" value={user.username} onChange={onChange} required placeholder="username" 
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="password">Password</label>
                    </td>
                    <td>
                      <input
                        type="password" name="password" value={user.password} onChange={onChange} required placeholder="password" 
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              
             <button> <Link to="/Users" className="user-btn">Login</Link></button>
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