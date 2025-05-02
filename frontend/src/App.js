// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const API_URL = process.env.REACT_APP_API_URL || 'http://backend:5000';
  
  console.log('API_URL:', process.env.REACT_APP_API_URL); // Debugging line
  // Fetch users from the backend
  useEffect(() => {
   axios.get(`${API_URL}/api/users`)
     .then(response => {
       setUsers(response.data);
     })
     .catch(error => {
       console.error('There was an error fetching users!', error);
     });
  }, [API_URL]); // ← add API_URL here

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  // Add a new user
  const handleAddUser = () => {
    axios.post(`${API_URL}/api/users`, newUser)
      .then(response => {
        setUsers((prevUsers) => [...prevUsers, response.data]);
        setNewUser({ name: '', email: '' });  // Reset form
      })
      .catch(error => {
        console.error('There was an error adding a user!', error);
      });
  };

  return (
    <div className="App">
      <h1>React + Node.js + PostgreSQL</h1>
      
      <div>
        <h2>Users</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name} - {user.email}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Add New User</h2>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
}

export default App;

