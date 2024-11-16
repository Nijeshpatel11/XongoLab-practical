const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      match: [/^\d{10}$/, "Please provide a valid 10-digit mobile number"],
    },
    hobby: {
      type: [String],
      enum: ["Cricket", "Chess", "Reading"],
      default: [],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },
    profileImage: {
  type: String,
  default: null,
},
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);
