import React, { useState, useEffect } from 'react';
import EditUser from './EditCity'; // Import the EditUser component
export const SERVER_URL = 'http://localhost:8080';

import './AdminHome.css';

const AdminHome = () => {
  useEffect(() => {
    fetchUsers(); // Called once after initial render
  }, []);

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  const fetchUsers = () => {
    fetch(`${SERVER_URL}/users`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setMessage('');
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setMessage('Error fetching users.');
      });
  };

  const deleteUser = (event, userId) => {
    setMessage('');
    if (window.confirm('Are you sure you want to delete the user?')) {
      fetch(`${SERVER_URL}/user/${userId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            setMessage('User deleted.');
            fetchUsers();
          } else {
            console.error('Error deleting user:', response.status);
          }
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
    }
  };

  const headers = ['ID', 'Name', 'Email'];

  return (
    <div>
      <div style={{ margin: 'auto' }}>
        <h3>User List</h3>
        <h4>{message}</h4>
        <table className="Center">
          <thead>
            <tr>
              {headers.map((s, idx) => (
                <th key={idx}>{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((row, idx) => (
              <tr key={idx}>
                <td>{row.userId}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>
                  <EditUser userId={row.userId} onClose={fetchUsers} />
                </td>
                <td>
                  <button
                    id="deleteUser"
                    type="button"
                    margin="auto"
                    onClick={(event) => deleteUser(event, row.userId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
