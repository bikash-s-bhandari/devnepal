const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now

    }

});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);




});


//creating JWT token
UserSchema.methods.getSignedJwtToken = async function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRETE, {//this._id is current resgister userId coming from user in controller
        expiresIn: process.env.JWT_EXPIRE
    });

}

module.exports = mongoose.model('User', UserSchema);