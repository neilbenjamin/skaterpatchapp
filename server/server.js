
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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Base server route
app.get('/', (req, res) => {
  res.send('Welcome, the server is active, bud.');
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


// The "catchall" handler: for any request that doesn't
// match one above, send back the index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


// Export the server for testing
module.exports = app;
