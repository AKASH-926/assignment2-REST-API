const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const User_route = require("../Routes/register_route");

mongoose.connect("mongodb://localhost/assignment", () => {
  console.log("connected to assignment DB");
});
const app = express();

app.use(bodyparser.json());

app.use("/", User_route);

app.listen(3000, () => console.log("Server up at 3000"));
