const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/profile', userController.updateProfile);

module.exports = router;
