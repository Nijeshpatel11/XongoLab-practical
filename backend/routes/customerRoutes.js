const express = require("express");
const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  toggleStatus,
  upload, 
} = require("../controllers/customerController");

const router = express.Router();


router.post("/", upload, createCustomer);

router.get("/", getCustomers);

router.get("/:id", getCustomerById);

router.put("/:id", upload, updateCustomer);

router.delete("/:id", deleteCustomer);

router.patch("/:id/status", toggleStatus);

module.exports = router;
