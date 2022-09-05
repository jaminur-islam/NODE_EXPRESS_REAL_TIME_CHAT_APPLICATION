const multer = require("multer");
const path = require("path");
const createError = require("http-errors");
function uploader(
  subFolder_path,
  allowed_file_types,
  max_file_size,
  error_msg
) {
  //File upload folder
  const UPLOAD_FOLDER = `${__dirname}/../public/uploads/${subFolder_path}/`;
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const filename =
        file.originalname.replace(fileExt).toLowerCase().split(" ").join("-") +
        "-" +
        Date.now();
      cb(null, filename + fileExt);
    },
  });

  const upload = multer({
    storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(error_msg));
      }
    },
  });
  return upload;
}
module.exports = uploader;
