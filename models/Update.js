const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UpdateSchema = new Schema({
    title: {
        type: String,
        maxlength: 50,
        required: true
    },
    subtitle: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String,
        maxlength: 5000,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: true,
    },
    modifiedBy: {
        type: String,
        required: false
    },
    modifiedOn: {
        type: Date,
        required: false
    },
    month: {
        type: Number,
        default: new Date().getMonth(),
        required: true
    },
    banner: {
        type: String
    }
});

module.exports = mongoose.model('updates', UpdateSchema);