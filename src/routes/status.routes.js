const express = require('express');
const router = express.Router();
const statusController = require("../controllers/status.controller");
const { authenticateUser } = require("../middlewares/authentication.middleware");
const restricted = require("../middlewares/restricted.middleware");


router.post('/create', [authenticateUser, restricted(["administrator"])], statusController.Create);

router.get('/', statusController.GetAll);

router.get('/:id', statusController.GetById);

router.patch('/update', [authenticateUser, restricted(["administrator"])], statusController.Update);

router.delete('/delete', [authenticateUser, restricted(["administrator"])], statusController.Delete);


module.exports = router;