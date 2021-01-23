const db = require('../models');
const router = require('./html-routes');

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

router.post("/api/workouts", async (req,res) => {
    db.Workout.create(req.body)
    .then((dbWorkout) => {
        console.log(dbWorkout);
        res.json(dbWorkout);
    }).catch((err) => {
        res.json(err);
    });
});

// updates one workout by adding an exercise
router.put('/api/workouts/:id', ({body, params}, res) => {
    let id = params.id;

    db.Workout.findByIdAndUpdate(id, 
        { $push: { exercises: body }},
        { new: true, runValidators: true }
    ) .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch(err => {
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