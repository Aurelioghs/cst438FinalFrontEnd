import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Signup(props) {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        city: '',
        state_code: '',
        country_code: '',
    });

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value,
        });
    };
  
    // Save course and close modal form
    const handleAdd = () => {
        props.signup(user);
        handleClose();
    }

    return (
        <div>
        <Button id="signup" variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
          Sign Up
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Enter Information</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >
                <TextField id="name" autoFocus fullWidth label="Name" name="name" value={user.name} onChange={handleChange}  />
                <TextField id="email" fullWidth label="Email" name="email" value={user.email} onChange={handleChange}  />
                <TextField id="password" fullWidth label="Password" name="password" value={user.password} onChange={handleChange}  />
                <TextField id="role" fullWidth label="Role" name="role" value={user.role} onChange={handleChange}  />
                <TextField id="city" fullWidth label="City" name="city" value={user.city} onChange={handleChange}  />
                <TextField id="state_code" fullWidth label="State Code" name="state_code" value={user.state_code} onChange={handleChange}  />
                <TextField id="country_code" fullWidth label="Country Code" name="country_code" value={user.country_code} onChange={handleChange}  />
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleClose}>Cancel</Button>
              <Button id="add" color="primary" onClick={handleAdd}>Sign Up</Button>
            </DialogActions>
          </Dialog>      
      </div>
    );

}

// required property:  addStudent is a function to call to perform the Add action
Signup.propTypes = {
    signup : PropTypes.func.isRequired
}
    
export default Signup;