const { check, validationResult } = require("express-validator");
const loginValidation = [
  check("username").isLength({ min: 1 }).withMessage("User name is required!"),
  check("password").isLength({ min: 1 }).withMessage("Password is required!"),
];

const loginValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedError = errors.mapped();

  if (Object.keys(mappedError).length === 0) {
    next();
  } else {
    req.render("index", {
      data: {
        username: req.body.username,
      },
      errors: mappedError,
    });
  }
};

module.exports = {
  loginValidation,
  loginValidationHandler,
};
