const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const db = require('./models');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/fitness-tracker',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );
  
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/exercise', (req, res) => {
res.sendFile(path.join(__dirname, './public/exercise.html'));
});

app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, './public/stats.html'));
});

app.use(require('./routes/api-routes.js'));

app.listen(PORT, () => {
    console.log('Application is listening on port $(PORT)!');
});