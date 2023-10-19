// require('dotenv').config();

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
// const userRouter = require("./routes/usersRoute");

const path = require("path");

// Middleware ==================================================
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use("/api", userRouter);
// Middleware ==================================================

// HTML, CSS
app.use(express.static(path.join(__dirname, "assets")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "index.html"));
});

// server start!!
app.listen(port, () => {
  console.log(port, "서버가 켜졌습니다.");
});
