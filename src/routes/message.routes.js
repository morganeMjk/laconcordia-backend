const express = require('express');
const router = express.Router();
const messageController = require("../controllers/message.controller");
const { authenticateUser } = require("../middlewares/authentication.middleware");
const restricted = require("../middlewares/restricted.middleware");
const checkStatus = require("../middlewares/checkStatus.middleware");

router.post('/create', messageController.Create);

router.get('/', [authenticateUser, restricted(["administrator", "committee"])], messageController.GetAll);

router.get('/:id', [authenticateUser, restricted(["administrator", "committee"])], messageController.GetById);

router.patch('/update', [authenticateUser, restricted(["administrator", "committee"])], messageController.Update);

router.delete('/delete', [authenticateUser, restricted(["administrator", "committee"])], messageController.Delete);

router.patch('/archive', [authenticateUser, restricted(["administrator", "committee"])], messageController.ArchiveMessage);

router.patch('/read', [authenticateUser, restricted(["administrator", "committee"])], messageController.IsReadMessage);


module.exports = router;