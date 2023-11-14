const express = require('express');
const router = express.Router();
const userRoleController = require("../controllers/user-role.controller");
const { authenticateUser } = require("../middlewares/authentication.middleware");
const restricted = require("../middlewares/restricted.middleware");


router.post('/create', [authenticateUser, restricted(["administrator"])], userRoleController.Create);

router.get('/', userRoleController.GetAll);

router.get('/:id', userRoleController.GetById);

router.patch('/update', [authenticateUser, restricted(["administrator"])], userRoleController.Update);

router.delete('/delete', [authenticateUser, restricted(["administrator"])], userRoleController.Delete);


module.exports = router;