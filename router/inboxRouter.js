// external import
const express = require("express");
const router = express.Router();

// internal import
const { getInbox } = require("../controller/inboxController");
const { checkLogin } = require("../middleware/common/checkLogin");
const decodeURIComponent = require("../middleware/common/decorateHtmlREsponse");

// inbox router
router.get("/", decodeURIComponent("inbox"), checkLogin, getInbox);

module.exports = router;
