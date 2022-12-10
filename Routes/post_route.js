const express = require("express");
const { RegisterDB, PostDB } = require("../models/Schema");
const Post_router = express.Router();

//=============================================================================================================================
Post_router.get("/posts", async (req, res) => {
  try {
    const posts = await PostDB.find();
    res.status(200).json({
      status: "FETCHED SUCCESFULLY",
      post: posts,
    });
  } catch (e) {
    res.status(400).json({
      status: "FAILED TO FETCH",
      message: e.message,
    });
  }
});
//=============================================================================================================================
Post_router.post("/posts", async (req, res) => {
  try {
    const posts = await PostDB.create({
      title: req.body.title,
      body: req.body.body,
      image: req.body.image,
      user: req.user,
    });
    res.status(200).json({
      status: "POSTED SUCCESFULLY",
      post: posts,
    });
  } catch (e) {
    res.status(400).json({
      status: "FAILED TO POST",
      message: e.message,
    });
  }
});
//=============================================================================================================================
Post_router.put("/posts/:postId", async (req, res) => {
  try {
    const posts = await PostDB.updateOne({ _id: req.params.postId }, req.body);
    res.status(200).json({
      status: "UPDATED SUCCESFULLY",
      post: posts,
    });
  } catch (e) {
    res.status(400).json({
      status: "FAILED TO UPDATE",
      message: e.message,
    });
  }
});
//=============================================================================================================================
Post_router.delete("/posts/:postId", async (req, res) => {
  try {
    const posts = await PostDB.deleteOne({ _id: req.params.postId });
    res.status(200).json({
      status: "DELETED SUCCESFULLY",
      post: posts,
    });
  } catch (e) {
    res.status(400).json({
      status: "FAILED TO DELETE",
      message: e.message,
    });
  }
});

module.exports = Post_router;
