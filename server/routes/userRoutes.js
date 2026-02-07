const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { updateProfileSchema } = require('../validators/user.validator');

router.use(protect);

router.get('/', userController.getAllUsers);
router.get('/me', userController.getCurrentUser);
router.get('/:id', userController.getUserById);
router.put('/profile', validate(updateProfileSchema), userController.updateProfile);
router.put('/change-password', userController.changePassword);

module.exports = router;