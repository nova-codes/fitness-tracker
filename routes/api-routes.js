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

// updates one workout by adding an exercise
router.put('/api/workouts/:id', (req,res) => {
    db.Fitness.findByIdAndUpdate(req.params.id, {
        $push: {
            exercises: req.body
        }
    })
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    });
});

// create a new workout
router.post('/api/workouts/range', (req, res) => {
    db.Workout.aggregate([
        {
            $sort: { day: -1 } 
        },
        {
            $limit: 7
        },
        { $addFields: {
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

module.exports = router;