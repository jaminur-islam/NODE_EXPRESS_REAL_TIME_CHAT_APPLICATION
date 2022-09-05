const User = require("../models/People");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
function getLogin(req, res, next) {
  res.render("index");
}

async function login(req, res, next) {
  console.log(req.body);
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.mobile }],
    });
    console.log(user);
    if (user && user._id) {
      const isValidPassWord = await bcrypt.compare(
        req.body.password,
        user.password
      );
      console.log(isValidPassWord);
      if (isValidPassWord) {
        const userInfo = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: "user",
        };
        const jwtGen = jwt.sign(userInfo, process.env.JWT_SECRET, {
          // algorithm: "HS256",
          expiresIn: process.env.JWT_EXPIRY,
        });

        res.cookie(process.env.COOKIE_NAME, jwtGen, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
          //  secure: true;
        });

        res.locals.loggedUser = userInfo;

        res.render("inbox");
      } else {
        throw createHttpError("Login failed! Please try agin.");
      }
    } else {
      throw createHttpError("User not defined! Please try agin.");
    }
  } catch (err) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

// Logout user
function logOut(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("Logged out");
}

module.exports = {
  getLogin,
  login,
  logOut,
};
