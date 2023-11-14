const express = require('express');
const router = express.Router();
const eventContoller = require("../controllers/event.controller");
const upload = require("../utils/multer.utils");
const { authenticateUser } = require("../middlewares/authentication.middleware");
const restricted = require("../middlewares/restricted.middleware");

router.post('/create', [authenticateUser, restricted(["administrator", "redactor", "professor", "photographer"]), upload.single('thumbnail')], eventContoller.Create);

router.post('/find', eventContoller.GetById);

router.get('/', eventContoller.GetAll);

router.patch('/update', [authenticateUser, restricted(["administrator", "redactor", "professor", "photographer"]), upload.single('thumbnail')], eventContoller.Update);

router.delete('/delete', [authenticateUser, restricted(["administrator", "redactor", "professor", "photographer"])], eventContoller.Delete);


module.exports = router;