const router = require('express').Router();
const db = require('../models');

// find all the workouts, calculates the total duration
router.get('/api/workouts', (req, res) => {
    db.Workout.find({})
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

// POST route => adds new workout to the database
router.post("api/workouts", (req, res) => {
    db.Workout.create({})
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

// updates one workout by adding an exercise
router.put('/api/workouts/:id', ({body, params}, res) => {
    db.Workout.findByIdAndUpdate(params.id, {$push: {exercises: body}}, {new: true, runValidators: true})
    .then((dbWorkout) => {
        res.json(dbWorkout);
        })
        .catch((err) => {
        res.json(err);
    });
  });

// create a new workout
router.post('/api/workouts/range', (req, res) => {
    db.Workout.find({}).limit(7)
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

module.exports = router;