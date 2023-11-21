import React from 'react';
import './userView.css';

function UserView() {
  return (
    <div className="main-page">
      <h1>User View Weather</h1>

      {/* Section for viewing current weather */}
      <section className="current-weather">
        <h2>Current Weather</h2>
        {/* Display current weather details here */}
       </section>

      {/* Search bar*/}
      <section className="search-section">
        <h2>Search Weather</h2>
        <input type="text" id="cityInput" placeholder="Enter City Name" />
        <button id="searchButton">Search</button>
      </section>

      {/* displaying weather of multiple cities */}
      <section className="cities-weather">
        <h2>Weather for Multiple Cities</h2>
        <table id="citiesTable">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {/*
              <tr>
                <td>New York</td>
                <td>25°C</td>
                <td>Partly Cloudy</td>
              </tr>
            */}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default UserView;
