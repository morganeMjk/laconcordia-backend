const express = require('express');
const router = express.Router();
const mediaController = require("../controllers/media.controller");
const upload = require("../utils/multer.utils");
const { authenticateUser } = require("../middlewares/authentication.middleware");
const restricted = require("../middlewares/restricted.middleware");

router.post('/create', [authenticateUser, restricted(["administrator", "photographer"]), upload.array('medias')], mediaController.Create);

router.post('/find', mediaController.GetById);

router.post('/find-by-album', mediaController.GetByAlbumId);

router.get('/', mediaController.GetAll);

router.patch('/update', [authenticateUser, restricted(["administrator", "photographer"]), upload.array('medias')], mediaController.Update);

router.delete('/delete', [authenticateUser, restricted(["administrator", "photographer"])], mediaController.Delete);


module.exports = router;