// POST: create trainer

const Trainer = require('../models/Trainer');

module.exports = async (req, res) => {
    try {
        const body = req.body;

        // Map frontend "Courses" → backend model format
        const mappedCourses = (body.Courses || []).map(c => ({
            Course: c.CourseId,
            CourseName: c.CourseName,
            RateType: c.RateType,
            Rate: c.Rate
        }));

        // Creating a new Trainer instance (using the imported model)
        const trainer = new Trainer({
            Contact: body.ContactId,
            Notes: body.Notes,
            Active: body.Active,
            Courses: mappedCourses
        });

        await trainer.save();

        res.json({ success: true, trainer });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};
