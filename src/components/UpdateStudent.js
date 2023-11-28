import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function UpdateStudent(props) {
    const [open, setOpen] = useState(false);
    const [student, setStudent] = useState({
        name: '',
        email: '',
        statusCode: 0,
        status: '',
    });

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
  
    const handleChange = (event) => {
        const { name, value } = event.target;
        setStudent({
            ...student,
            [name]: value,
        });
    };
  
    // Save course and close modal form
    const handleUpdate = () => {
        const updatedStudent = { ...student, student_id: props.student.student_id };
        props.updateStudent(updatedStudent);
        handleClose();
    }

    return (
        <div>
        <Button id="updateStudent" type="button" margin="auto" onClick={handleClickOpen}>
          Update
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update Student</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >
                <TextField id="name" autoFocus fullWidth label="Name" name="name" value={student.name} onChange={handleChange}  />
                <TextField id="email" fullWidth label="Email" name="email" value={student.email} onChange={handleChange}  />
                <TextField id="statusCode" fullWidth label="Status Code" name="statusCode" value={student.statusCode} onChange={handleChange}  />
                <TextField id="status" fullWidth label="Status" name="status" value={student.status} onChange={handleChange}  />
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleClose}>Cancel</Button>
              <Button id="update" color="primary" onClick={handleUpdate}>Update</Button>
            </DialogActions>
          </Dialog>      
      </div>
      );
    }

// required property:  updateStudent is a function to call to perform the Update action
UpdateStudent.propTypes = {
    updateStudent : PropTypes.func.isRequired,
    student: PropTypes.object.isRequired,
}
    
export default UpdateStudent;