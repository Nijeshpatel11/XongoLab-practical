import React, { useState, useEffect } from "react";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomerForm from "../Customer/CustomerForm";
import axios from "axios";
import { toast } from "react-toastify";

const EditCustomerPage = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCustomer = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/customers/${id}`);
      setCustomer(response.data.customer);
      console.log(response.data.customer)
    } catch (error) {
      toast.error("Failed to fetch customer.");
    }
  };

  const handleUpdate = async (data) => {
    setIsLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/customers/${id}`, data);
      toast.success("Customer updated successfully!");
      navigate("/customers");
    } catch (error) {
      toast.error("Failed to update customer.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  return (
    <Box p={3}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/">Home</Link>
        <Link to="/customers">Customers</Link>
        <Typography color="text.primary">Edit Customer</Typography>
      </Breadcrumbs>
      <Typography variant="h5" mt={3}>
        Edit Customer
      </Typography>
      {customer && (
        <CustomerForm
          onSubmit={handleUpdate}
          initialData={customer}
          isLoading={isLoading}
        />
      )}
    </Box>
  );
};

export default EditCustomerPage;
