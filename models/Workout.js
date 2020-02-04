const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
});

module.exports = mongoose.model('workouts', WorkoutSchema);