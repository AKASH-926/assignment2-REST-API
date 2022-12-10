const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { RegisterDB, PostDB } = require("../models/Schema");

const secret = "MYAPIAUTH";

const User_route = express.Router();
User_route.get("/", (req, res) => {
  res.status(200).json({
    message: "server working fine",
  });
});

User_route.post(
  "/register",
  body("name").isAlphanumeric(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          return err.message;
        }
        try {
          const user = await RegisterDB.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
          });
          res.status(200).json({
            status: "User Added",
            user: user,
          });
        } catch (e) {
          res.status(400).json({
            status: "user not added",
            message: e.message,
          });
        }
      });
    } catch (e) {
      res.status(400).json({
        status: "user not added",
        message: e.message,
      });
    }
  }
);
//===================================================================================================================================================
User_route.post("/login", body("email").isEmail(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await RegisterDB.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email not registered",
      });
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: user._id,
          },
          secret
        );
        res.status(200).json({
          status: "User login successfull",
          token: token,
        });
      } else {
        res.status(400).json({
          status: "Login failed",
          message: "Invalid credentials",
        });
      }
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});

module.exports = User_route;
