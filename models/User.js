const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
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
    createdAt: {
        type: Date,
        default: new Date(),
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    },
    exercises: [{
        name: {
            type: String,
            required: true,
            unique: true
        },
        type: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('users', UserSchema);