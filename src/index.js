const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const User_route = require("../Routes/register_route");
const jwt = require("jsonwebtoken");
const secret = "MYAPIAUTH";
const Post_router = require("../Routes/post_route");
mongoose.connect("mongodb://localhost/assignment", () => {
  console.log("connected to assignment DB");
});
const app = express();

app.use(bodyparser.json());

app.use("/posts", async (req, res, next) => {
  // console.log(req.headers.authorization);
  if (req.headers.authorization) {
    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, secret, function (err, decoded) {
        if (err) {
          return res.status(400).json({
            status: "Failed",
            message: "Not vaild token",
          });
        }
        req.user = decoded.data;
        // console.log(req.body);
        next();
      });
    } else {
      return res.status(401).json({
        status: "Failed",
        message: "Token missing",
      });
    }
  } else {
    return res.status(403).json({
      status: "Failed",
      message: "Not authenticated user",
    });
  }
});
app.use("/", User_route);
app.use("/", Post_router);

app.listen(3000, () => console.log("Server up at 3000"));
