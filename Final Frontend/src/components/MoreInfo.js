import React from 'react';
import { useEffect, useState} from 'react';
import './userView.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

  {/* Display lots of other info from api's for this city, whether its from the search, or from the table*/}
function MoreInfo(props){
    const [isDialogOpen, setDialogOpen] = useState(true);
    const token = sessionStorage.getItem("jwt");
    const [data, setData] = useState(null);
   

    function getExtraData(){
      alert("HERE");
      // console.log("GETTING CITIES");
       fetch(`http://localhost:8080/getmoredata/${props.data.cityName}`, {
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
         .then(data => {
          setData(data);
           console.log("Weather Data :",data);
           console.log(data.tempC);
           console.log(data.visibilityKiloM
            )
           //console.log("Weather Data Array SET?:", citiesWeather);
           //console.log(citiesWeather[0]);
         })
         .catch(error => {
           console.error("Error fetching extra weather data:", error);
         });
       }
       useEffect(() => {
       getExtraData();
      }, []); 
    const handleCloseDialog = () => {
       props.handleCloseInfoDisplay();
      };
    return (
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>More Information</DialogTitle>
          <DialogContent>
         <h2>Weather At {props.data.cityName}</h2><br></br>
          {data === null ? (
          <p>Loading...</p>
     
      ) : (
        <div>
       
          Temperature: {props.data.tempC}°C / {props.data.tempF}°F<br></br>
          Feels Like: {data.feelsLikeC}°C / {data.feelsLikeF}°F <br></br>
          {props.data.desc}<br></br>
          Humidity: {data.humidity} Percent <br></br>
          Wind Speed: {props.data.windSpeedMph} MPH /  {props.data.windSpeedKph} KPH<br></br>
          SunriseTime: {data.sunriseTime}<br></br>
          SunsetTime: {data.sunsetTime}<br></br>
          Visibility: {data.visibilityMiles} Miles / {data.visibilityKiloM} Kilometers<br></br>
          Cloudiness: {data.cloudsPercent} Percent<br></br>
        </div>
      )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      );
}

export default MoreInfo;