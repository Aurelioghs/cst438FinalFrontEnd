import React from 'react';
import { useEffect, useState} from 'react';
import './userView.css';

function UserView() {
  const [userWeather, setUserWeather] = useState(null);
  const [searchedWeather, setSearchWeather] = useState(null);
  const [citiesWeather, setCities] = useState(null);
  const token = sessionStorage.getItem("jwt");
  function getUserWeather(){
   // console.log("INSIDE USERWEATHER");
    console.log("TOKEN: ",token);
    if (token!= null){
    fetch('http://localhost:8080/getuserweather', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
         'Authorization' : token
      },
    })
      .then(response => {
        if (response.ok) {
           return response.json();
        }
        else{
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .then(weatherData => {
        setUserWeather(weatherData);
        console.log("CURRENT USER WEATHER:" ,weatherData);
       // console.log("USER'S WEATHER:",userWeather);
        //console.log(userWeather.tempF);
      })
      .catch(error => {
        console.error("Error fetching user weather data:", error);
      });
    }
    else{
      console.log("TOKEN IS NULL");
    }
    }
    
    function searchCity(){
   // console.log("IN SEARCHCITY");
    var cityInput = document.getElementById('cityInput').value;
   // console.log(cityInput);
      fetch(`http://localhost:8080/getweather/${cityInput}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(weatherData => {
          setSearchWeather(weatherData);
          console.log("WEATHERSEARCHED:",weatherData)
         //console.log("SEARCH RESULTS:",searchedWeather)
        })
        .catch(error => {
          console.error("Error fetching weather data:", error);
        });
    }
    
    function getDefaultCities(){
   // console.log("GETTING CITIES");
    fetch('http://localhost:8080/getweathers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
           return response.json();
        }
        else{
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .then(weatherDataArray => {
        setCities(weatherDataArray);
        console.log("Weather Data Array:", weatherDataArray);
        //console.log("Weather Data Array SET?:", citiesWeather);
        //console.log(citiesWeather[0]);
      })
      .catch(error => {
        console.error("Error fetching default weather data:", error);
      });
    }
  useEffect(() => {
   getDefaultCities();
  }, []);

  useEffect(() => {
   //console.log(searchedWeather);
  }, [searchedWeather]); 

  useEffect(() => {
   getUserWeather();
   }, []); 

 

  return (
    <div className="main-page">
    <div className="header-container">
      <h1>User View Weather</h1>
      <button>Settings</button>
    </div>
      {/* Section for viewing current weather */}
  {userWeather !== null ? (
    <section className="current-weather">
    <h2>Weather At {userWeather.cityName}</h2>
    Temperature: {userWeather.tempC}<br></br>
    Description: {userWeather.desc}<br></br>
    Wind Speed: {userWeather.windSpeed}<br></br>
    {/* Display other current weather details here */}
    </section>) : (<p>Loading...</p> )}

      {/* Search bar*/}
      <section className="search-section">
        <h2>Search Weather</h2>
        <input type="text" id="cityInput" placeholder="Enter City Name"/>
        <button id="searchButton" onClick={searchCity}> Search</button>
      </section>

      {/* displaying weather of multiple cities */}
      <section className="cities-weather">
      <div className="header-container">
        <h2>Weathers around the World</h2> <button>Add City</button></div>
        {citiesWeather !== null ? (
    <table id="citiesTable">
      <thead>
        <tr>
          <th>City</th>
          <th>Temperature</th>
          <th>Description</th>
          <th>Wind Speed</th>
        </tr>
      </thead>
      <tbody>
        {citiesWeather.map((city, idx) => (
          <tr key={idx}>
            <td>{city.cityName}</td>
            <td>{city.tempC}°C</td>
            <td>{city.desc}</td>
            <td>{city.windSpeed}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>Loading cities weather...</p>
  )}
</section>
    </div>
  );
}

export default UserView;
