const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const register_schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const RegisterDB = mongoose.model("RegisterDB", register_schema);

const Post_schema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  image: { type: String, required: true },
  user: { type: ObjectId, ref: "RegisterDB" },
});

const PostDB = mongoose.model("PostDB", Post_schema);

module.exports = { RegisterDB, PostDB };
