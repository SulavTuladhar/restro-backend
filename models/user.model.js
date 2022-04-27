const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // Database Modeling
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true
    },
    password:{
        type: String,
        require: true,
        minlength: 8
    },
    dob: {
        type: Date
    },
    phoneNumber: {
        type: Number
    },
    address: {
        tempAddress:[String],
        permanentAddress: String
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others']
    },
    role:{
        type: String,
        enum:['admin', 'user']
    },
    image: String
},
    // timestamps
    {
        timestamps: true
    }
)
module.exports = mongoose.model('user', UserSchema);