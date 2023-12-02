import React from 'react';
import { useEffect, useState} from 'react';
import './userView.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

  {/* Render component as a dialog/modal, or make a new page for it?*/}
  function Settings(props) {
    const [isDialogOpen, setDialogOpen] = useState(true);
    const [tempUnit, setTempUnit] = useState(props.tempUnit);
    const [speedUnit, setSpeedUnit] = useState(props.speedUnit);
    const token = sessionStorage.getItem("jwt");
    const role =  sessionStorage.getItem("role");
    const [user, setUser] = useState({
      city: '',
      statecode: '',
      countrycode: ''
    });
  
  function getUser(){
    alert("GETTING USER");
    fetch(`http://localhost:8080/getuser`, {
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
        console.log("USER:", data);
        setUser(data);
      })
      .catch(error => {
        console.error("Error fetching User", error);
      });
  }

  function updateUserAddr(){
   // alert("GETTING USER");
    fetch(`http://localhost:8080/`, {
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
        console.log("USER:", data);
        setUser(data);
      })
      .catch(error => {
        console.error("Error updating User address", error);
      });
  }

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
    const handleCloseDialog = () => {
      props.handleCloseSettings();
    };
  
    const handleTemp = (tempUnit) => {
      setTempUnit(tempUnit);
    };

    const handleSpeed= (speedUnit) => {
      setSpeedUnit(speedUnit);
    };
  
    const handleUpdateSettings = () => {
      updateUserAddr();
      props.handleTemp(tempUnit);
      props.handleSpeed(speedUnit);
      handleCloseDialog();
    };

    useEffect(() => {
      getUser();
     }, []); 
  
  
    return (
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle style={{ textAlign: 'center' }}>Settings</DialogTitle>
        <DialogContent id="content">
          Choose Default Temperature To Display
          <label>
            <input
              type="radio"
              name="tempUnit"
              value="F"
              checked={tempUnit === 'F'}
              onChange={() => handleTemp('F')}
            />
            Fahrenheit
          </label>
          <label>
            <input
              type="radio"
              name="tempUnit"
              value="C"
              checked={tempUnit === 'C'}
              onChange={() => handleTemp('C')}
            />
            Celsius
          </label><br></br>
          Choose Default Wind Speed
          <label>
            <input
              type="radio"
              name="speedUnit"
              value="M"
              checked={speedUnit === 'M'}
              onChange={() => handleSpeed('M')}
            />  MPH
            <br></br>
          
          </label>
          <label>
            <input
              type="radio"
              name="speedUnit"
              value="K"
              checked={speedUnit === 'K'}
              onChange={() => handleSpeed('K')}
            />
            KPH
          </label>
          <br></br>
          Update Address<br></br><br></br>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" value={user.city} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="statecode">State Code</label>
            <input type="text" id="statecode" name="stateCode" value={user.stateCode} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="countrycode">Country Code</label>
            <input type="text" id="countrycode" name="countryCode" value={user.countryCode} onChange={onChange} />
          </div>
         
        </DialogContent>
  
        <DialogActions>
          <Button color="secondary" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button id="updateAddressBtn" color="secondary" onClick={handleUpdateSettings}>
            Update Settings
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
export default Settings