const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const trainersRoutes = require('./routes/trainers');

const app = express();

mongoose.connect('mongodb://localhost:27017/trainers', { useNewUrlParser: true, useUnifiedTopology: true });

app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Load models into app for route handlers
app.models = {
    Trainer: require('./api/models/Trainer')
};

app.use('/', trainersRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
