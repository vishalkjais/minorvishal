const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },

    is_verified: {
        type: Number,
        default: 0
    },

    token: {
        type: String,
        default: ''
    }

}, {
    timestamps: true
});

const User = new mongoose.model("User", userSchema);

module.exports = User;