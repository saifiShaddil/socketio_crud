const mongoose = require('mongoose');
const { Schema } = require("mongoose");

let id = 0;
const UserSchema = new Schema({
    fullname: {
        type: String,
        // required: true,
      },
      email: {
        type: String,
        // required: true,
        unique: true,
      },
      age: {
        type: Number,
        
      },
      gender: {
        type: String,
      }
}, {
    timestamps: true,
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;

