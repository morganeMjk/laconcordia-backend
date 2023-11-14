const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { authenticateUser } = require("../middlewares/authentication.middleware");
const restricted = require("../middlewares/restricted.middleware");

router.post('/signup', userController.SignUp);
router.post('/signin', userController.SignIn);
router.post('/verify', userController.VerifyAccount);
router.post('/verify-resend', userController.ResendVerification);
router.post('/profile', authenticateUser, userController.GetProfile);
router.post('/find', [authenticateUser, restricted(["administrator"])], userController.GetById);
router.post('/reset-password', userController.PasswordReset);
router.post('/check-reset-code', userController.CheckResetCode);
router.post('/update-reset-password', userController.PasswordResetUpdate);
router.get('/all', [authenticateUser, restricted(["administrator"])], userController.GetAll);
router.get('/allbase', userController.GetAllBase);
router.patch('/archive', [authenticateUser, restricted(["administrator"])], userController.ArchiveUser);
router.patch('/update', [authenticateUser, restricted(["administrator"])], userController.UserUpdate)
router.patch('/update-password', authenticateUser, userController.PasswordUpdate);
router.patch('/update-notification', authenticateUser, userController.NotificationUpdate);

module.exports = router;






