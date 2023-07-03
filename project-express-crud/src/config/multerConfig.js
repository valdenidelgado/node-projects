const multer = require('multer');
const { extname, resolve } = require('path');

const random = () => Math.floor(Math.random() * 10000 + 10000);

const storage = multer.diskStorage({
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('Arquivo precisa ser PNG ou JPG.'));
    }

    return cb(null, true);
  },
  destination: (req, file, cb) => {
    cb(null, resolve(__dirname, '..', '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
