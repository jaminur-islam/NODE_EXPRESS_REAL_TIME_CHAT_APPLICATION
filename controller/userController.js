const bcrypt = require("bcrypt");
const User = require("../models/People");
const { unlink } = require("fs");
const path = require("path");
async function getUser(req, res, next) {
  try {
    const users = await User.find();
    res.render("users", {
      users: users,
    });
  } catch (err) {
    next(err);
  }
}

async function addUser(req, res, next) {
  let newUser;
  const hashPassword = await bcrypt.hash(req.body.password, 10);

  if (req.files && req.files.length > 0) {
    console.log(req.files[0].filename);
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashPassword,
    });
  }

  // save user and send error
  try {
    const result = await newUser.save();
    res.status(200).json({ message: "User was added successfully" });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occurred",
        },
      },
    });
  }
}

async function deleteUser(req, res, next) {
  try {
    const user = await User.findByIdAndDelete({
      _id: req.params.id,
    });

    if (user.avatar) {
      unlink(
        path.join(__dirname, `/../public/uploads/avatar/${user.avatar}`),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    res.status(200).json({
      message: "User was removed successfully",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete the user!",
        },
      },
    });
  }
}
module.exports = { getUser, addUser, deleteUser };
