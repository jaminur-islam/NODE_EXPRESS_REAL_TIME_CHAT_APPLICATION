// internal import
const express = require("express");
const router = express.Router();
// external import
const {
  getUser,
  addUser,
  deleteUser,
} = require("../controller/userController");
const { checkLogin } = require("../middleware/common/checkLogin");
const decodeURIComponent = require("../middleware/common/decorateHtmlREsponse");
const avatarUpload = require("../middleware/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middleware/users/usersValidation");

// Router
router.get("/", decodeURIComponent("users"), checkLogin, getUser);
router.post(
  "/",
  checkLogin,
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);
router.delete("/:id", deleteUser);

module.exports = router;
