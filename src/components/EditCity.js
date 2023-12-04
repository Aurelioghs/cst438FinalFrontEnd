import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import './EditCity.css';

export const SERVER_URL = 'http://localhost:8080'; // Replace this with your actual server URL

const EditCity = (props) => {
  const [open, setOpen] = useState(false);
  const [cityData, setCityData] = useState({ 
    cityName: '', 
    temperature: '',
    description: '',
    windSpeed: ''
  }); // Initialize with an empty object

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    setCityData({ ...cityData, [event.target.name]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const updateCity = () => {
    fetch(`${SERVER_URL}/city/${cityData.city_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cityData),
    })
      .then((res) => {
        if (res.ok) {
          console.log('City Updated');
        } else {
          console.error('Error: ' + res.status);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <button id="editbutton" type="button" margin="auto" onClick={handleClickOpen}>
        Edit
      </button>
      <Dialog open={open}>
        <DialogTitle>Edit City</DialogTitle>
        <DialogContent id ="dialog" style={{ paddingTop: 20 }}>
          <TextField id="cityName" autoFocus fullWidth label="City Name" name="cityName" value={cityData.cityName} onChange={handleChange}/>
          <TextField id="temperature" fullWidth label="Temperature" name="temperature" value={cityData.temperature} onChange={handleChange}/>
          <TextField id="description" fullWidth label="Description" name="description" value={cityData.description} onChange={handleChange}/>
          <TextField id="windSpeed" fullWidth label="Wind Speed" name="windSpeed" value={cityData.windSpeed} onChange={handleChange}/>
        </DialogContent>
        <DialogActions>
          <Button id="closebutton" color="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button id="updatebutton" color="primary" onClick={updateCity}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditCity;
