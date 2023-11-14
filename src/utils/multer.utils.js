const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        console.log(file)
        const randomName = Math.random().toString(36).substring(2, 15);
        const format = file.mimetype.split('/')[1];
        cb(null, `${Date.now()}-${randomName}.${format}`)
    }
});

const upload = multer({
    storage: storage, // Choose destination and filename
    limits: { 
        fileSize: 1000000 * 5000,
        fieldSize: (2 * (1024 * 1024)) * 1000000 
    }, // Max file size in bytes (1 MB)
});

module.exports = upload;