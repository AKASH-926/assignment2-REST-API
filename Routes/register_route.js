const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const { RegisterDB, PostDB } = require("../models/Schema");

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
        const user = await RegisterDB.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        });
        res.status(200).json({
          status: "User Added",
          user: user,
        });
      });
    } catch (e) {
      res.status(400).json({
        status: "user not added",
        message: e.message,
      });
    }
  }
);
User_route.post("/login", async (req, res) => {
  try {
  } catch (e) {}
});

module.exports = User_route;
