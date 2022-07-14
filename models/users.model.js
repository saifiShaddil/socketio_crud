const mongoose = require('mongoose');
const { Schema } = require("mongoose");

let id = 0;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 8,
    }
}, {
    timestamps: true,
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;

