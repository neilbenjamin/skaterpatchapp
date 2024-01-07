const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController')

//HISTORY SECTION

//CREATE - POST used patch data.
router.post('/:userId/add-patch-history', historyController.createPatchHistory);

// GET Fetch Used Patch Data
router.get('/:userId/patch-history', historyController.getPatchHistory);

module.exports = router;