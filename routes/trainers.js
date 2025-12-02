const express = require('express');
const router = express.Router();
const auth = require('../api/middleware/auth');
const Trainer = require('../api/models/Trainer');

// Load API handlers
const newTrainer = require('../api/trainers/new');

router.get('/new', auth, (req, res) => {
    // Server-Side Rendering: Render new trainer form
    res.render('trainers/new', { trainer: {} });
});

router.post('/api/v1/trainers', auth, newTrainer);

module.exports = router;
