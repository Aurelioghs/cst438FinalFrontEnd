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
    const [tempUnit, setTempUnit] = useState(props.tempUnit); // Assuming you pass the current tempUnit as a prop
  
    const handleCloseDialog = () => {
      props.handleCloseSettings();
    };
  
    const handleTemp = (tempUnit) => {
      setTempUnit(tempUnit);
    };
  
    const handleUpdateSettings = () => {

      props.handleTemp(tempUnit);
      handleCloseDialog();
    };
  
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
          </label>
          Update Address
          <TextField className="dialog-input" label="Name of city" cityName="name" onChange={handleCloseDialog} />
          <br></br>
          <TextField className="dialog-input" label="Country Code" countryCode="code" onChange={handleCloseDialog} />
          <br></br>
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