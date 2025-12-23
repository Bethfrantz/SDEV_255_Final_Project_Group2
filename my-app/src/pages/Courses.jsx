import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Courses({ user }) {
    const [courses, setCourses] = useState([]);

    // Load all courses
    useEffect(() => {
        fetch("http://localhost:5000/courses")
            .then(res => res.json())
            .then(data => setCourses(data));
    }, []);

    // Delete a course (Teacher only)
    function handleDelete(id) {
        const confirmDelete = window.confirm("Are you sure you want to delete this course?");
        if (!confirmDelete) return;

        fetch(`http://localhost:5000/courses/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(() => {
                setCourses(courses.filter(course => course._id !== id));
            });
    }

    return (
        <div>
            <h1>Courses</h1>

            {/* Teacher-only Add Course button */}
            {user?.role === "Teacher" && (
                <Link to="/add-course" style={styles.addButton}>
                    + Add New Course
                </Link>
            )}

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Subject</th>
                        <th>Credits</th>
                        <th>Description</th>
                        {user?.role === "Teacher" && <th>Actions</th>}
                    </tr>
                </thead>

                <tbody>
                    {courses.map(course => (
                        <tr key={course._id}>
                            <td>{course.name}</td>
                            <td>{course.subject}</td>
                            <td>{course.credits}</td>
                            <td>{course.description}</td>

                            {/* Teacher-only Edit/Delete */}
                            {user?.role === "Teacher" && (
                                <td>
                                    <Link
                                        to={`/edit-course/${course._id}`}
                                        style={styles.editButton}
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(course._id)}
                                        style={styles.deleteButton}
                                    >
                                        Delete
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "1rem"
    },
    addButton: {
        display: "inline-block",
        marginBottom: "1rem",
        padding: "0.5rem 1rem",
        background: "var(--primary)",
        color: "white",
        textDecoration: "none",
        borderRadius: "6px"
    },
    editButton: {
        marginRight: "0.5rem",
        padding: "0.3rem 0.6rem",
        background: "#4a90e2",
        color: "white",
        borderRadius: "4px",
        textDecoration: "none"
    },
    deleteButton: {
        padding: "0.3rem 0.6rem",
        background: "#d9534f",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
    }
};
