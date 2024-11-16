import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Checkbox,
  FormGroup,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import { Close as CloseIcon } from "@mui/icons-material";

const hobbiesList = ["Cricket", "Chess", "Reading"];

const CustomerForm = ({ onSubmit, initialData, isLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    hobby: [],
    gender: "",
    status: "active",
    profileImage: null,
    profileImagePreview: null,
  });

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        profileImagePreview: initialData.profileImage
          ? `http://localhost:5000${initialData.profileImage}`
          : null,
        hobby: initialData.hobby || [],
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: file,
          profileImagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      profileImage: null,
      profileImagePreview: null,
    }));
  };

  const handleHobbyChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      hobby: prev.hobby.includes(value)
        ? prev.hobby.filter((h) => h !== value)
        : [...prev.hobby, value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile || !formData.gender) {
      toast.error("Please fill out all required fields.");
      return;
    }
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "hobby") {
        formData.hobby.forEach((hobby) => data.append("hobby", hobby));
      } else if (key === "profileImage" && formData.profileImage) {
        data.append("profileImage", formData.profileImage);
      } else if (key !== "profileImagePreview") {
        data.append(key, formData[key]);
      }
    });
    onSubmit(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} p={3}>
     
      <Box textAlign="center" mb={3}>
        {formData.profileImagePreview && (
          <Box position="relative" display="inline-block">
            <Box
              component="img"
              src={formData.profileImagePreview}
              alt="Preview"
              sx={{
                width: 100,
                height: 100,
                objectFit: "cover",
                borderRadius: "50%",
                border: "1px solid #ccc",
              }}
            />
            <IconButton
              onClick={handleRemoveImage}
              color="error"
              aria-label="Remove image"
              sx={{
                position: "absolute",
                top: -10,
                right: -10,
                backgroundColor: "white",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        {!formData.profileImagePreview && (
          <Button variant="outlined" component="label">
            Upload Profile Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        )}
      </Box>

      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />

      <Box display="flex" gap={2} marginBottom={2}>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Mobile Number"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          fullWidth
          required
        />
      </Box>

<Box display="flex" gap={2} marginBottom={2}>
 
  <Box flex={1} border="1px solid #ccc" borderRadius={4} p={2}>
    <FormControl component="fieldset">
      <FormLabel component="legend">Hobby</FormLabel>
      <FormGroup row> {/* Make hobbies appear in a row */}
        {hobbiesList.map((hobby) => (
          <FormControlLabel
            key={hobby}
            control={
              <Checkbox
                checked={formData.hobby.includes(hobby)}
                onChange={handleHobbyChange}
                value={hobby}
              />
            }
            label={hobby}
          />
        ))}
      </FormGroup>
    </FormControl>
  </Box>

 
  <Box flex={1} border="1px solid #ccc" borderRadius={4} p={2}>
    <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup
        row /* Make gender options appear in a row */
        name="gender"
        value={formData.gender}
        onChange={handleChange}
      >
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  </Box>
</Box>



     
      <FormControl fullWidth margin="normal">
        <FormLabel>Status</FormLabel>
        <Select name="status" value={formData.status} onChange={handleChange}>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
      </FormControl>

     
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button
        style={{background : "#ABC178" , textTransform : "none" }}
          type="submit"
          variant="contained"
          
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Add Customer"}
        </Button>
      </Box>
    </Box>
  );
};

export default CustomerForm;
