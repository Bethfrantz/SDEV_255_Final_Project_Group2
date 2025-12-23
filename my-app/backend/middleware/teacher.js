function teacher(req, res, next) {
    if (req.user.role !== "Teacher") {
        return res.status(403).json({ message: "Forbidden: Teachers only" });
    }
    next();
}

module.exports = teacher;
