const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const Course = require("./models/Course");


mongoose.connect("mongodb://localhost:27017/coursesdb")
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error(err));


// Middleware
app.use(cors());
app.use(express.json());



// Temporary in-memory database
let courses = [
    {
        id: 1,
        name: "Intro to Programming",
        description: "Learn the basics of programming.",
        subject: "Computer Science",
        credits: 3
    }
];

// ✅ GET — Retrieve all courses
app.get("/courses", async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
});

// ✅ POST — Add a new course
app.post("/courses", async (req, res) => {
    const course = await Course.create(req.body);
    res.status(201).json(course);
});



// ✅ PUT/PATCH — Update a course
app.put("/courses/:id", async (req, res) => {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});


// ✅ DELETE — Remove a course
app.delete("/courses/:id", async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
