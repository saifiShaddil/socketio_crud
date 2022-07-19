const router = require("express").Router();
const express = require("express");
const Posts = require("../models/posts.model");

router.use(express.json());

// to show all the post
router.route("/").get((req, res) => {
  // logic to get user details
  Posts.find()
    .sort({ createdAt: -1 })
    .then((post) => {
      res.status(200).send(post);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error Occured",
      });
    });
});

// show post according to their id's
router.route("/:id").get((req, res) => {
  // logic to get post details
  Posts.findById(req.params.id)
    .then((post) => {
      if (!post) {
        return res.status(404).send({
          message: "Post not found with id " + req.params.id,
        });
      }
      res.status(200).send(post);
      // console.log(user);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.id,
      });
    });
});

// to add new post
router.route("/").post((req, res) => {
  // logic to add new post details
  if (!req.body.title || !req.body.price || !req.body.image) {
    return res.status(400).send({
      message: "Title, Image and Price are required",
    });
  }
  const { title, description, price, tag, image } = req.body
  const newPost = new Posts({ title, description, price, tag, image });
  newPost
    .save()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(404).json("Error: " + err));
});

// to upadet the post info
router.route("/:id").put((req, res) => {
  //logic to update post details
  if (!req.body.title || !req.body.image || !req.body.price) {
    return res.status(400).send({
      message: "Title, Image and Price are required",
    });
  }
  Posts.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((post) => {
      if (!post) {
        return res.status(404).send({
          message: "No Post found",
        });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      return res.status(404).send({
        message: "Error while updating the post",
      });
    });
})

router.route("/:id").delete((req, res) => {
  //logic to update post details
  Posts.findByIdAndRemove(req.params.id)
    .then((post) => {
      if (!post) {
        return res.status(404).send({
          message: "Post not found",
        });
      }
      res.send({ message: "Post deleted successfully!" });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Could not delete Post",
      });
    });
});

module.exports = router;
