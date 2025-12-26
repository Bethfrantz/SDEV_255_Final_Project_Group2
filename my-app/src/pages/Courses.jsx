import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Courses({ user, setUser }) {
    const [courses, setCourses] = useState([]);

    // Load all courses
    useEffect(() => {
        fetch("http://localhost:5000/courses")
            .then(res => res.json())
            .then(data => setCourses(data));
    }, []);

    // Teacher-only: Delete a course
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

    // Student-only: Register for a course
    function handleRegister(courseId) {
        fetch("http://localhost:5000/api/users/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({ courseId })
        })
            .then(res => res.json())
            .then(data => {
                alert("Course Added!");

                // Update user state so UI updates instantly
                setUser(prev => ({
                    ...prev,
                    registeredCourses: data.registeredCourses
                }));
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

                        {/* Teacher-only column */}
                        {user?.role === "Teacher" && <th>Actions</th>}

                        {/* Student-only column */}
                        {user?.role === "Student" && <th>Register</th>}
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

                            {/* Student-only Register button */}
                            {user?.role === "Student" && (
                                <td>
                                    {user?.registeredCourses?.includes(course._id) ? (
                                        <span style={styles.registeredTag}>
                                            Registered
                                        </span>

                                    ) : (
                                        <button
                                            onClick={() => handleRegister(course._id)}
                                            style={styles.registerButton}
                                        >
                                            Register
                                        </button>
                                    )}
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
    },
    registerButton: {
        padding: "0.3rem 0.6rem",
        background: "green",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
    },
    registeredTag: {
        padding: "0.3rem 0.6rem",
        background: "#6c757d",
        color: "white",
        borderRadius: "12px",
        fontSize: "0.85rem",
        fontWeight: "600"
    }

};
