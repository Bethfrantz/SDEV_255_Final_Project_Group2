import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import "../style.css";

export default function Courses({ user, setUser }) {
    const [courses, setCourses] = useState([]);

    // Load all courses
    useEffect(() => {
        setCourses([
            {
                _id: "1",
                name: "Web Development Fundamentals",
                subject: "Technology",
                credits: 3,
                description: "Learn HTML, CSS, JavaScript, and build responsive websites."
            },
            {
                _id: "2",
                name: "Introduction to Psychology",
                subject: "Humanities",
                credits: 3,
                description: "Explore human behavior, cognition, emotion, and mental processes."
            },
            {
                _id: "3",
                name: "Database Systems & SQL",
                subject: "Technology",
                credits: 4,
                description: "Design relational databases and write SQL queries for real applications."
            },
            {
                _id: "4",
                name: "Principles of Marketing",
                subject: "Business",
                credits: 3,
                description: "Study branding, consumer behavior, digital marketing, and strategy."
            }
        ]);
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
        }).then(() => {
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
                <Link to="/add-course" className="add-course-btn">
                    + Add New Course
                </Link>
            )}

            <div className="courses-grid">
                {courses.map(course => (
                    <CourseCard
                        key={course._id}
                        title={course.name}
                        description={course.description}
                        category={course.subject}
                        credits={course.credits}
                        isTeacher={user?.role === "Teacher"}
                        isStudent={user?.role === "Student"}
                        isRegistered={user?.registeredCourses?.includes(course._id)}
                        onDelete={() => handleDelete(course._id)}
                        onRegister={() => handleRegister(course._id)}
                        editLink={`/edit-course/${course._id}`}
                    />
                ))}
            </div>
        </div>
    );
}
