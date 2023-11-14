const express = require('express');
const router = express.Router();
const roleController = require("../controllers/role.controller");
const { authenticateUser } = require("../middlewares/authentication.middleware");
const restricted = require("../middlewares/restricted.middleware");


router.post('/create', [authenticateUser, restricted(["administrator"])], roleController.Create);

router.get('/', roleController.GetAll);

router.get('/:id', roleController.GetById);

router.patch('/update', [authenticateUser, restricted(["administrator"])], roleController.Update);

router.delete('/delete', [authenticateUser, restricted(["administrator"])], roleController.Delete);


module.exports = router;