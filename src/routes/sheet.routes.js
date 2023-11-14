const express = require('express');
const router = express.Router();
const sheetController = require("../controllers/sheet.controller");
const upload = require("../utils/multer.utils");
const { authenticateUser } = require("../middlewares/authentication.middleware");
const restricted = require("../middlewares/restricted.middleware");



router.post('/create', [authenticateUser, restricted(["administrator", "professor", "chief", "archivist"]), upload.single('sheetFile')], sheetController.Create);

router.get('/', sheetController.GetAll);

router.post('/find', sheetController.GetById);

router.patch('/update', [authenticateUser, restricted(["administrator", "professor", "chief", "archivist"]), upload.single('sheetFile')], sheetController.Update);

router.delete('/delete', [authenticateUser, restricted(["administrator", "professor", "chief", "archivist"])], sheetController.Delete);


module.exports = router;