const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    Course: { type: String, required: true },
    CourseName: String,
    RateType: String,
    Rate: Number
});

const trainerSchema = new mongoose.Schema({
    Contact: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
    Notes: String,
    Active: { type: Boolean, default: true },
    Courses: [courseSchema]
}, { timestamps: true });

module.exports = mongoose.model('Trainer', trainerSchema);
