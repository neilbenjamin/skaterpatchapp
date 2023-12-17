// routers/userRouter.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { updateRole } = require('../controllers/adminController');

// User registration route
router.post('/register', userController.createUser);

// User login route
router.post('/login', userController.userLogin);

// Update user profile route
router.put('/update-user-profile/:userId', userController.updateUserProfile);

// Get user profile route
router.get('/get-user-profile/:userId', userController.getUserProfile);

// New route for getting all users
router.get('/all-users', userController.getAllUsers);

// Example in your Express route file
router.get('/skater', userController.getSkaterUsers);

// Update user role - Only accessible by super admin
router.put('/update-role/:userId', updateRole);

// Delete the skater database.
router.delete('/delete-user/:userId', userController.deleteUser);

module.exports = router;
