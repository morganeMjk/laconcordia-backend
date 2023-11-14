const express = require('express');
const router = express.Router();
const userInstrumentController = require("../controllers/user-instrument.controller");
const upload = require("../utils/multer.utils");
const { authenticateUser } = require("../middlewares/authentication.middleware");
const restricted = require("../middlewares/restricted.middleware");

router.post('/create', [authenticateUser, restricted(["administrator"])], userInstrumentController.Create);

router.get('/', userInstrumentController.GetAll);

router.get('/:id', userInstrumentController.GetById);

router.post('/find-by-user', [authenticateUser, restricted(["administrator"])], userInstrumentController.GetByUserId);

router.patch('/update', [authenticateUser, restricted(["administrator"])], userInstrumentController.Update);

router.delete('/delete', [authenticateUser, restricted(["administrator"])], userInstrumentController.Delete);


module.exports = router;