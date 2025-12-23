const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    subject: String,
    credits: Number
});

module.exports = mongoose.model("Course", CourseSchema);
