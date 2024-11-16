import React from "react";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CustomerForm from "../Customer/CustomerForm";
import axios from "axios";
import { toast } from "react-toastify";

const CustomerCreatePage = () => {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/customers", data);
      toast.success("Customer created successfully!");
      navigate("/customers");
    } catch (error) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message || "Failed to create customer.");
    }
  };

  return (
    <Box p={3}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/">Home</Link>
        <Link to="/customers">Customers</Link>
        <Typography color="text.primary">Create Customer</Typography>
      </Breadcrumbs>
      <Typography variant="h5" mt={3}>
        Create Customer
      </Typography>
      <CustomerForm onSubmit={handleCreate} />
    </Box>
  );
};

export default CustomerCreatePage;
