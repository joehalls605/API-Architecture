const express = require('express');
const router = express.Router();
const auth = require('../api/middleware/auth');
const Trainer = require('../api/models/Trainer');

// Load API handlers
const newTrainer = require('../api/trainers/new');

// When someone visits /new, it renders a form for creating a new trainer
router.get('/new', auth, (req, res) => {
    // Server-Side Rendering: Render new trainer form
    // tells Express: take a template file, fill it with data, and send HTML back to the browser.
    // This is used when you are generating pages on the server, instead of sending raw JSON.
    // 'trainers/new' is the path to the template inside your views/ folder.
    // { trainer: {} } is an object of data that the template can use.
    res.render('trainers/new', { trainer: {} });
});

// When someone submits a form, this route passes the request to the newTrainer controller function.
router.post('/api/v1/trainers', auth, newTrainer);

module.exports = router;

/*
router.get('/new', …) → says: “If someone visits /new, run this function to render the form.”

router.post('/api/v1/trainers', …) → says: “If someone submits data to /api/v1/trainers, run the newTrainer controller to handle it.”
 */