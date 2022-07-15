const router = require("express").Router();
const express = require("express");
const Users = require("../models/users.model");

router.use(express.json());

// to show all the users
router.route("/").get((req, res) => {
  // logic to get user details
  Users.find()
    .sort({ name: -1 })
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error Occured",
      });
    });
});

// show user according to their id's
router.route("/:id").get((req, res) => {
  // logic to get user details
  Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.status(200).send(user);
      // console.log(user);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.id,
      });
    });
});

// to add new user
router.route("/").post((req, res) => {
  // logic to add new user details
  const { fullname, email, age, gender } = req.body;
  const newUser = new Users({ fullname, email, age, gender });
  newUser
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.status(404).json("Error: " + err));
});

// to upadet the user info
router.route("/:id").put((req, res) => {
  //logic to update user details
  if (!req.body.fullname || !req.body.age || !req.body.email || !req.body.gender) {
    return res.status(400).send({
      message: "required fields cannot be empty",
    });
  }
  Users.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "No user found",
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
  //logic to update user details
  Users.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found ",
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Could not delete user ",
      });
    });
});

module.exports = router;
