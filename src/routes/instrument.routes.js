const express = require('express');
const router = express.Router();
const { authenticateUser } = require("../middlewares/authentication.middleware");
const restricted = require("../middlewares/restricted.middleware");
const instrumentController = require("../controllers/instrument.controller");


router.post('/create', [authenticateUser, restricted(["administrator"])], instrumentController.Create);

router.get('/', instrumentController.GetAll);

router.get('/find', instrumentController.GetById);

router.patch('/update', [authenticateUser, restricted(["administrator"])], instrumentController.Update);

router.delete('/delete', [authenticateUser, restricted(["administrator"])], instrumentController.Delete);


module.exports = router;