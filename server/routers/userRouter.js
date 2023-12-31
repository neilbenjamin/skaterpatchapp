// routers/userRouter.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const historyController = require('../controllers/historyController')
const { updateRole } = require('../controllers/adminController');

// User registration route - POST
router.post('/register', userController.createUser);

// User login route - POST
router.post('/login', userController.userLogin);

// Update user profile route - PUT
router.put('/update-user-profile/:userId', userController.updateUserProfile);

// Get user profile route - GET
router.get('/get-user-profile/:userId', userController.getUserProfile);

// New route for getting all users - GET
router.get('/all-users', userController.getAllUsers);

// Example in your Express route file - GET
router.get('/skater', userController.getSkaterUsers);

// Update Skater Profile by Skater - PUT
router.put('/get-user-profile/:userId', userController.updateSkaterProfile);

//Purchase new PatchCard - POST
router.post('/purchase-patch-card/:userId', userController.purchasePatchCard);

//Update User PatchCard - PUT
router.put('/:userId/patches/:patchId', userController.updateUserPatch);

// Update user role - Only accessible by super admin
router.put('/update-role/:userId', updateRole);

//Fetch the dateUsed for the specific patch
router.get('/get-date-used/:userId/patches/:patchId', userController.getDateUsed);

// Delete the skater database.
router.delete('/delete-user/:userId', userController.deleteUser);

//HISTORY SECTION

//CREATE - POST used patch data.
// router.post('/:userId/add-patch-history', historyController.createPatchHistory);

// GET Fetch Used Patch Data
// router.get('/:userId/patch-history', historyController.getPatchHistory);


module.exports = router;
