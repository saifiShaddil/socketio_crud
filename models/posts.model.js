const mongoose = require('mongoose');
const { Schema } = require("mongoose");

let id = 0;
const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      price: {
        type: Number,
        required: true, 
      },
      image: {
        type: String,
        required: true,
      },
      tag: {
        type: Array,
      },
      seller: {
        type: String,
      },
}, {
    timestamps: true,
});

const Posts = mongoose.model('Posts', PostSchema);

module.exports = Posts;

