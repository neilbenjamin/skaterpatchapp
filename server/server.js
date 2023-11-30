
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const db = require('./dbConfig/dbConfig');
const cors = require('cors'); // Import the cors middleware
const app = express();
const path = require('path');
app.use(cookieParser());

// Middleware to parse JSON data
app.use(express.json());

// Use the cors middleware to handle Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Base server route
app.get('/', (req, res) => {
  res.send('Welcome, the server is active.');
});

// Health route
app.get('/health', (req, res) => {
  res.json({ message: 'server is healthy' }); // Return JSON response
});

// New Registered User Routers
const userRouter = require('./routers/userRouter'); // Adjust the path as necessary
app.use('/api/users', userRouter); // Use userRouter for user-related routes

// //production script
// app.use(express.static('./client/frontend/build'));
// app.get("*", (req,res)=> {
//   res.sendFile(path.resolve(__dirname, "client", "frontend", "build", "index.html"))
// });


// Listening on port 8080.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
// Export the server for testing
module.exports = app;
