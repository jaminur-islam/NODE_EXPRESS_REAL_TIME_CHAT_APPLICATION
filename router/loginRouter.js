// external import
const express = require("express");
const router = express.Router();
// internal imports [controller]
const { getLogin, login, logOut } = require("../controller/loginController");
const {
  checkLogin,
  redirectLoggedIn,
} = require("../middleware/common/checkLogin");
const decorateHtmlREsponse = require("../middleware/common/decorateHtmlREsponse");
const {
  loginValidation,
  loginValidationHandler,
} = require("../middleware/login/loginValidators");

const page_title = "login_page";

// All Router
router.get("/", decorateHtmlREsponse(page_title), redirectLoggedIn, getLogin);
router.post(
  "/",
  decorateHtmlREsponse(page_title),
  loginValidation,
  loginValidationHandler,
  login
);
router.delete("/", logOut);

module.exports = router;
