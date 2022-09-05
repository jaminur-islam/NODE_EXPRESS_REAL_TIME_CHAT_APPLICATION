//external imports
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

//internal imports[MiddleWare];
const loginRouter = require("./router/loginRouter");
const userRouter = require("./router/userRouter");
const inboxRouter = require("./router/inboxRouter");
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/common/errorHandler");
//internal imports[Router]
const app = express();
require("dotenv").config();

// database connection
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connect successfully"))
  .catch((err) => console.log(err));

// req parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");
//set static/public folder
app.use(express.static(path.join(__dirname, "public")));
// parser cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

const port = process.env.PORT || 5000;

// Routing setup
app.use("/", loginRouter);
app.use("/users", userRouter);
app.use("/inbox", inboxRouter);
// app.use("/inbox", inboxRouter);

// 404 not found setup
app.use(notFoundHandler, errorHandler);
// Common error Handler
// app.use(errorHandler);
app.listen(port, () => {
  console.log(`server listing http://localhost:${port}`);
});
