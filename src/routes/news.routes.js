const express = require('express');
const router = express.Router();
const newsController = require("../controllers/news.controller");
const upload = require("../utils/multer.utils");
const { authenticateUser } = require("../middlewares/authentication.middleware");
const restricted = require("../middlewares/restricted.middleware");

router.post('/create', [authenticateUser, restricted(["administrator", "redactor", "photographer", "professor"]), upload.single('thumbnail')], newsController.Create);

router.post('/find', newsController.GetById);
 
router.get('/', newsController.GetAll);

router.patch('/update', [authenticateUser, restricted(["administrator", "redactor", "photographer", "professor"]), upload.single('thumbnail')], newsController.Update);

router.delete('/delete', [authenticateUser, restricted(["administrator", "redactor", "photographer", "professor"])], newsController.Delete);


module.exports = router;