const express = require('express');
const router = express.Router();
const albumController = require("../controllers/album.controller");
const { authenticateUser } = require("../middlewares/authentication.middleware");
const restricted = require("../middlewares/restricted.middleware");
const upload = require("../utils/multer.utils");

router.post('/create', [authenticateUser, restricted(["administrator", "photographer"]), upload.single('thumbnail')], albumController.Create);

router.post('/find', albumController.GetById);

router.get('/', albumController.GetAll);

router.get('/:id', albumController.GetById);

router.patch('/update', [authenticateUser, restricted(["administrator", "photographer"]), upload.single('thumbnail')], albumController.Update);

router.delete('/delete', [authenticateUser, restricted(["administrator", "photographer"])], albumController.Delete);


module.exports = router;