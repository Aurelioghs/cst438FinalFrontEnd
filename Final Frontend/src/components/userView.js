import React from 'react';
import { useEffect, useState} from 'react';
import './userView.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MoreInfo from './MoreInfo';
import Settings from './Settings';

function UserView() {
  const [userWeather, setUserWeather] = useState(null);
  const [searchedWeather, setSearchWeather] = useState(null);
  const [citiesWeather, setCities] = useState(null);
  const initialTempUnit = localStorage.getItem('tempUnit') || 'F';
  const [tempUnit, setTempUnit] = useState(initialTempUnit);

  const initialSpeedUnit = localStorage.getItem('speedUnit') || 'M';
  const [speedUnit, setSpeedUnit] = useState(initialSpeedUnit);

  const token = sessionStorage.getItem("jwt");
  const role =  sessionStorage.getItem("role");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [city, setCityName] = useState('');
  const [country_code, setCountryCode] = useState('');
  const [failedSearch,setFailedSearch] = useState('');
  const [openSettings, setOpenSetting] = useState(false)
  const [moreInfo, setDisplayMoreInfo] = useState(false);
  const [infoData, setMoreInfoData] = useState(null);
  const [cityMsg, setMsg] = useState(null);

  const handlemoreInfoBtn = (data) => {
    //console.log(data.desc);
    setMoreInfoData(data);
    //console.log(infoData);
    setDisplayMoreInfo(true);
    }

  const handleCityNameChange = (event) => {
    setCityName(event.target.value);
  };

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };
  
  const open = () => {
    setDialogOpen(true);
  };
  
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleTemp = (tempUnit) => {
    alert(tempUnit);
    setTempUnit(tempUnit);
    localStorage.setItem('tempUnit', tempUnit);
  }

  const handleSpeed = (speedUnit) => {
    alert(speedUnit);
    setSpeedUnit(speedUnit);
    localStorage.setItem('speedUnit', speedUnit);
  }

  const handleCloseSearch = () => {
    setSearchWeather(null);
  }

  const handleOpenSettings= () => {
    setOpenSetting(true);
  }

  const handleCloseSettings= () => {
    //alert("CLOSING SETTINGS");
    setOpenSetting(false);
  }

  const handleCloseInfoDisplay = () =>{
    setMoreInfoData(null);
    setDisplayMoreInfo(false);
  }



  function addCity(){
    //alert("HERE");
    console.log(city)
    console.log(country_code)
    const requestData = {
      city: city,
      country_code: country_code,
     
    };
  
    fetch('http://localhost:8080/addcity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : token
      },
      body: JSON.stringify(requestData),
    })
      .then(response => {
        if (response.ok) {
          getWeathers();
          setMsg(null);
          handleCloseDialog();
           return response.json();
        }
        else if(response.status === 400){
          setMsg("City already exists in the table");
          setTimeout(() => {
            setMsg(null);
          }, 3000);
        }
        else{
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .then(Data=> {
       
      })
      .catch(error => {
        console.error("Error adding city:", error);
      });
  }

  function getUserWeather(){
    alert(role);
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
          setFailedSearch("Couldn't find results");
          setTimeout(() => {
            setFailedSearch(null);
          }, 4000);
        });
    }
    
    function getWeathers(){
   // console.log("GETTING CITIES");
    fetch('http://localhost:8080/getweathers', {
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
   getWeathers();
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
      <button onClick={handleOpenSettings}>Settings</button>
    </div>
    {openSettings === true ? <Settings handleCloseSettings={handleCloseSettings} handleSpeed={handleSpeed}
                                        handleTemp={handleTemp}/> : <p></p>}

   
      {/* Section for viewing current weather */}
      {userWeather !== null ? (
    <section className="current-weather">
    <h2>Weather At {userWeather.cityName}</h2>
    Temperature: {tempUnit==='C' ? `${userWeather.tempC}°C` : `${userWeather.tempF}°F`}<br></br>
    Description: {userWeather.desc}<br></br>
    Wind Speed: {speedUnit ==='M' ? `${userWeather.windSpeedMph}MPH`: `${userWeather.windSpeedKph}KPH` }
    <br></br>
    <button id="moreinfoTable"  onClick={() => handlemoreInfoBtn(userWeather)}> More Info</button>
    {/* Display other current weather details here */}
    </section>) : (<p>Loading...</p> )}
 

      {/* Search bar*/}
      <section className="search-section">
        <h2>Search Weather</h2>
        <input type="text" id="cityInput" placeholder="Enter City Name"/>
        <button onClick={searchCity}> Search</button>
      </section>

      {failedSearch !==null ? <p>{failedSearch}</p> : <p></p> }

       {searchedWeather ==null ? (<p></p>) : (
       <p> <h2>Weather At {searchedWeather.cityName}</h2><br></br>
        Temperature: {tempUnit==='C' ? `${searchedWeather.tempC}°C` : `${searchedWeather.tempF}°F`}<br></br>
        Description: {searchedWeather.desc}<br></br>
        Wind Speed: {speedUnit ==='M' ? `${searchedWeather.windSpeedMph}MPH`: `${searchedWeather.windSpeedKph}KPH` }<br></br>
        <button id="moreInfoSearch" onClick={() => handlemoreInfoBtn(searchedWeather)}style={{ marginRight: '10px' }}> More Info</button>
        <button id="closeSearch" onClick={handleCloseSearch}>Close Results</button>
       </p>) }
      
      {/* displaying weather of multiple cities */}
      <section className="cities-weather">
      <div className="header-container">
        <h2>Weathers around the World</h2>  <button onClick={open}> Add City</button></div>
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
            <DialogTitle style={{ textAlign:'center'}}>Add City To View</DialogTitle>
            <DialogContent id="content" >
            <TextField className="dialog-input" label="Name of city" cityName="name" onChange={handleCityNameChange}  /><br></br> 
            <TextField className="dialog-input" label="Country Code" countryCode="code" onChange={handleCountryCodeChange}  /><br></br> 
            </DialogContent>

            <DialogActions>
              <Button color="secondary" onClick={handleCloseDialog}>Cancel</Button>
              <Button id = "addCityBtn"color="secondary" onClick={addCity}>Add City</Button>
              {cityMsg === null ? null : <><br></br> {cityMsg} </>}
            </DialogActions>
          </Dialog>      

      {moreInfo === true && infoData !==null ? <MoreInfo data={infoData} tempUnit={tempUnit} speedunit={speedUnit}
                                                handleCloseInfoDisplay ={handleCloseInfoDisplay}/> : <p></p>}

        {citiesWeather !== null ? (
    <table id="citiesTable">
      <thead>
        <tr>
          <th>City</th>
          <th>Temperature</th>
          <th>Description</th>
          <th>Wind Speed</th>
          <th>More Info</th>
        </tr>
      </thead>
      <tbody>
        {citiesWeather.map((city, idx) => (
          <tr key={idx}>
            <td>{city.cityName}</td>
            <td>
              {tempUnit==='C' ? `${city.tempC}°C` : `${city.tempF}°F`}
            </td>
            <td>{city.desc}</td>
            <td> Wind Speed: {speedUnit ==='M' ? `${city.windSpeedMph}MPH`: `${city.windSpeedKph}KPH` }</td>
            <td><button id="moreinfoTable"  onClick={() => handlemoreInfoBtn(city)}> More Info</button></td>  {/* Click to render new page/component for more info */}
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
