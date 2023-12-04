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
    const role = sessionStorage.getItem("role");
    const [user, setUser] = useState({
      city: '',
      statecode: '',
      countrycode: ''
    });
    const [view, setView] = useState('prefs');
    const [users,setUsers] = useState(null);
  
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

  function getUsers(){
    alert("GETTING USERS");
    fetch(`http://localhost:8080/getusers`, {
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
        console.log("USERS:", data);
        setUsers(data);
      })
      .catch(error => {
        console.error("Error fetching Users", error);
      });
  }

  function deleteUser(user){
    alert("Deleting");
    console.log(user.id);
   fetch(`http://localhost:8080/user/${user.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : token
      },
    })
      .then(response => {
        if (response.ok) {
          getUsers();
          alert("userDeleted");
           return response.json();
        }
        else{
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .catch(error => {
        console.error("Error deleting User", error);
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

    const handleUsersView = () => {
      getUsers();
      setView('users');
    };

    const handleDeleteUser = (user) => {
      //alert("Deleting USER");
   
      const isConfirmed = window.confirm(`Are you sure you want to delete ${user.name}?`);

      if (isConfirmed) {
        console.log(`Deleting user: ${user.name}`);
        deleteUser(user);
       
      } else {
        console.log(`Deletion canceled for user: ${user.name}`);

    }
  }

    const handlePrefsView = () => {
      setView('prefs');
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
        {view ==='prefs' ? 
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
        </DialogContent>: 
        <DialogContent>
          {users === null ? <p>Loading Users...</p>: 
           <table id="usersTable">
           <thead>
             <tr>
               <th>ID</th>
               <th>Name</th>
               <th>Email</th>
               <th>Action</th>
             </tr>
           </thead>
           <tbody>
             {users.map((user, idx) => (
               <tr key={idx}>
                 <td>{user.id}</td>
                 <td>{user.name}</td>
                 <td> {user.email}</td>
                 <td><button id="deleteUserBtn"  onClick={() => handleDeleteUser(user)}> Delete User</button></td>  {/* Click to render new page/component for more info */}
               </tr>
             ))}
           </tbody>
         </table>}
        </DialogContent>}
  
        <DialogActions>
          <Button color="secondary" onClick={handleCloseDialog}>
            Cancel
          </Button>
           {(role ==="ADMIN" && view==='prefs')? <Button onClick={handleUsersView}>Delete Users</Button>:null}
           {view === 'users' ? <Button onClick={handlePrefsView}>Back</Button>:null}
          <Button id="updateAddressBtn" color="secondary" onClick={handleUpdateSettings}>
            Update Settings
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
export default Settings