const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fitnessSchema = new Schema({
    day: {
        type: Date,
        default: Date.now()
    },
    exercises: []
});

const fitness = mongoose.model("Fitness", fitnessSchema);

module.exports = fitness;