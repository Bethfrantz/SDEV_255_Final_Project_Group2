const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Course = require("./models/Course");
const User = require("./models/User");

const auth = require("./middleware/auth");
const teacher = require("./middleware/teacher");

const app = express();
const PORT = 5000;

// =========================
// MIDDLEWARE
// =========================
app.use(cors());
app.use(express.json());

// =========================
// DATABASE CONNECTION
// =========================
mongoose
    .connect("mongodb://localhost:27017/coursesdb")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));


// =========================
// USER AUTHENTICATION
// =========================

// Register (optional for testing)
app.post("/register", async (req, res) => {
    const { username, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: hashedPassword,
        role
    });

    res.json({ message: "User registered", user });
});

// Login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
        { id: user._id, role: user.role, username: user.username },
        "SECRET123",
        { expiresIn: "1h" }
    );

    res.json({
        message: "Login successful",
        token,
        username: user.username,
        role: user.role,
        registeredCourses: user.registeredCourses
    });
});


// =========================
// USER COURSE REGISTRATION (CART)
// =========================

// Add course to student's schedule
app.post("/api/users/cart", auth, async (req, res) => {
    const userId = req.user.id;
    const { courseId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.registeredCourses.includes(courseId)) {
        return res.status(400).json({ message: "Already registered" });
    }

    user.registeredCourses.push(courseId);
    await user.save();

    res.json({
        message: "Course added!",
        registeredCourses: user.registeredCourses
    });
});

// Remove course from student's schedule
app.delete("/api/users/cart/:courseId", auth, async (req, res) => {
    const userId = req.user.id;
    const { courseId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.registeredCourses = user.registeredCourses.filter(
        id => id.toString() !== courseId
    );

    await user.save();

    res.json({
        message: "Course removed",
        registeredCourses: user.registeredCourses
    });
});


// =========================
// COURSE ROUTES
// =========================

// Public: Get all courses
app.get("/courses", async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
});

// Teacher-only: Create course
app.post("/courses", auth, teacher, async (req, res) => {
    const course = await Course.create(req.body);
    res.json(course);
});

// Teacher-only: Update course
app.put("/courses/:id", auth, teacher, async (req, res) => {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

// Teacher-only: Delete course
app.delete("/courses/:id", auth, teacher, async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
});


// =========================
// START SERVER
// =========================
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
