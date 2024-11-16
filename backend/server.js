const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConnect = require('./utils/dbConnect');
const authRoutes = require('./routes/authRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const customerRoutes = require("./routes/customerRoutes");
dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());

dbConnect();

app.use("/uploads", express.static("uploads"));


app.use('/api/auth', authRoutes);
app.use("/api/customers", customerRoutes);


app.use(errorMiddleware);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
