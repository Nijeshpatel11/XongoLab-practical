const Customer = require("../models/Customer");
const asyncHandler = require("../utils/asyncHandler");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

exports.upload = upload.single("profileImage");


exports.createCustomer = asyncHandler(async (req, res) => {
    const { name, email, mobile, hobby, gender, status } = req.body;
  
    console.log(req.body , 
        '1'
    )

    if (!name || !email || !mobile || !gender) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }
  
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null;
    console.log(profileImage , 
        "2"
    )
  
    const customer = new Customer({ name, email, mobile, hobby, gender, status, profileImage });

    console.log(customer , "3")
    await customer.save();
    res.status(201).json({ message: "Customer created successfully", customer });
  });

exports.getCustomers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = "", sort = "createdAt" } = req.query;

  const query = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const customers = await Customer.find(query)
    .sort({ [sort]: 1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Customer.countDocuments(query);

  res.status(200).json({ customers, total });
});


exports.getCustomerById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const customer = await Customer.findById(id);
  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  res.status(200).json({ customer });
});


exports.updateCustomer = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    const updatedData = { ...req.body };
    if (req.file) {
      updatedData.profileImage = `/uploads/${req.file.filename}`;
    }
  
    const customer = await Customer.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
  
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
  
    res.status(200).json({ message: "Customer updated successfully", customer });
  });


exports.deleteCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const customer = await Customer.findByIdAndDelete(id);

  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  res.status(200).json({ message: "Customer deleted successfully" });
});

exports.toggleStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const customer = await Customer.findById(id);

  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  customer.status = customer.status === "active" ? "inactive" : "active";
  await customer.save();

  res.status(200).json({ message: "Customer status updated", customer });
});
