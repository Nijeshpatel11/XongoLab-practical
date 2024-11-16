import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  IconButton,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate(); 

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/customers");
      setCustomers(response.data.customers);
    } catch (error) {
      toast.error("Failed to fetch customers.");
    }
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/customers/${id}`);
      toast.success("Customer deleted successfully.");
      fetchCustomers(); 
    } catch (error) {
      toast.error("Failed to delete customer.");
    }
  };


  const handleStatusChange = async (id, newStatus) => {
    try {
      
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer._id === id ? { ...customer, status: newStatus } : customer
        )
      );
  
    
      await axios.patch(`http://localhost:5000/api/customers/${id}/status`, { status: newStatus });
  
      toast.success("Status updated successfully.");
    } catch (error) {
      toast.error("Failed to update status.");
      fetchCustomers();
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Box mb={2} display="flex" justifyContent="space-between">
        <Typography variant="h5">Customers</Typography>
        <Button
        style={{ background : "#ABC178"}}
          variant="contained"
          
          onClick={() => navigate("/customers/create")} 
        >
          Create Customer
        </Button>
      </Box>
      <TextField
        label="Search"
        variant="outlined"
        sx={{ width: 1/4 }}
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Profile</TableCell> 
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Hobby</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((customer) => (
                <TableRow key={customer._id}>
                  
                  <TableCell>
                    {customer.profileImage ? (
                      <Box
                        component="img"
                        src={`http://localhost:5000${customer.profileImage}`}
                        alt="Profile"
                        sx={{
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                          borderRadius: "15px", 
                          border: "2px solid #ccc",
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          backgroundColor: "#ccc",
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.mobile}</TableCell>
                  <TableCell>{customer.hobby.join(", ")}</TableCell>
                  <TableCell>{customer.gender}</TableCell>
                  <TableCell>
                    <Select
                      value={customer.status}
                      onChange={(e) =>
                        handleStatusChange(customer._id, e.target.value) 
                      }
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => navigate(`/customers/edit/${customer._id}`)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(customer._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredCustomers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default CustomerList;
