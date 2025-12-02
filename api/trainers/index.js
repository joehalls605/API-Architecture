// Main router for trainers
// its job is to collect and export all the trainer routes
// Index.js is basically a “hub” or “entry point” for this group of endpoints.

// Routes: list, create, update, delete

const express = require('express');
const router = express.Router();

// import other route handlers
const newTrainer = require('./new');
const updateTrainer = require('./update');
const deleteTrainer = require('./delete');
const getTrainer = require('./get');

// assign them to routes
router.post('/', newTrainer);
router.put('/:id', updateTrainer);
router.delete('/:id', deleteTrainer);
router.get('/:id', getTrainer);

module.exports = router;
