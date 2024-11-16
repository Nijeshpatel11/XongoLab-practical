import React from "react";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import CustomerList from "../components/Customer/CustomerList";
import CustomerForm from "../components/Customer/CustomerForm";

const CustomerPage = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [editingCustomer, setEditingCustomer] = React.useState(null);

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingCustomer(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <Box p={3}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Customer Management</Typography>
      </Breadcrumbs>
      {showForm ? (
        <CustomerForm onClose={handleCloseForm} customer={editingCustomer} />
      ) : (
        <CustomerList onEdit={handleEdit} onAdd={handleAdd} />
      )}
    </Box>
  );
};

export default CustomerPage;
