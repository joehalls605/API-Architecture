// GET: fetch trainers
// This file handles requests from the frontend to retrieve trainer data.

const Trainer = require('../models/Trainer');

module.exports = async (req, res) => {
    try {
        // Check if the frontend provided an ID in the query string: /api/v1/trainers?id=123
        const trainerId = req.query.id;

        let result;

        if (trainerId) {
            // If an ID exists, return ONE trainer
            result = await Trainer.findById(trainerId);

            if (!result) {
                return res.status(404).json({
                    success: false,
                    error: "Trainer not found"
                });
            }
        } else {
            // If no ID is provided, return ALL trainers
            result = await Trainer.find();
        }

        // Send back JSON to the frontend
        res.json({
            success: true,
            trainers: result
        });

    } catch (err) {
        // Handle unexpected errors
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};
