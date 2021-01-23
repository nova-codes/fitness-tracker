const path = require('path');
const mongoose = require('mongoose');
const db = require('../models');
const router = require('./html-routes');

// find all the workouts, calculates the total duration
router.get('/api/workouts', (req, res) => {
    db.Fitness.aggregate([
        {
            $addFields: {
                totalDuration: {$sum: '$exercises.duration'}
            }
        }
    ])
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    });
});