import React, { useState } from 'react';
import api from '../api/authApi';
import '../styles/Forms.css';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({
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

    
    if (!form.email || !form.password) {
      setErrors('Email and password are required.');
      return;
    }

    try {
      const response = await api.post('/login', form);
      toast.success('Login successful!');
      console.log(response)
        localStorage.setItem("user", JSON.stringify(response.data)); 
  window.location.href = "/customers";
     
      navigate('/');
    } catch (error) {
      setErrors(error.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="form-container">
      <h2>Log in to your Account</h2>
      {errors && <div className="error">{errors}</div>}
      <form onSubmit={handleSubmit}>
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

        <button style={{background : "#ABC178" , borderRadius : "6px"}} type="submit">Log in</button>
      </form>
      <p style={ {fontSize : "12px" , textAlign : "center"}}>By signing in or creating an account, you agree with Terms & Conditions and Privacy Policy.</p>
    </div>
  );
};

export default Login;
