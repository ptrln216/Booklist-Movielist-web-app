const express = require('express');
const cors = require('cors');

// Initialize server
const app = express();

// Set Middleware
app.use(express.json());  // body parser
app.use(express.urlencoded({ extended: false }));  // body parser
app.use(cors());

// Listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));