const express = require('express');
const router = express.Router();
const userStatusController = require("../controllers/user-status.controller");
const { authenticateUser } = require("../middlewares/authentication.middleware");
const restricted = require("../middlewares/restricted.middleware");


router.post('/create', [authenticateUser, restricted(["administrator"])], userStatusController.Create);

router.get('/', userStatusController.GetAll);

router.get('/:id', userStatusController.GetById);

router.patch('/update', [authenticateUser, restricted(["administrator"])], userStatusController.Update);

router.delete('/delete', [authenticateUser, restricted(["administrator"])], userStatusController.Delete);


module.exports = router;