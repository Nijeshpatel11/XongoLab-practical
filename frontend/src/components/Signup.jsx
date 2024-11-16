import React, { useState } from 'react';
import api from '../api/authApi';
import '../styles/Forms.css';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (!form.name || !form.email || !form.password) {
      setErrors('All fields are required.');
      return;
    }

    try {
      const response = await api.post('/register', form);
      toast.success('Signup successful! You can now log in.');
      navigate('/login');
    } catch (error) {
      setErrors(error.response?.data?.message || 'Signup failed.');
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      {errors && <div className="error">{errors}</div>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        <button type="submit" style={ { background : "#ABC178"}}>Signup</button>
      </form>
    </div>
  );
};

export default Signup;
