import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function MySchedule({ user, setUser }) {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (!user) return;

        fetch("http://localhost:5000/courses")
            .then(res => res.json())
            .then(allCourses => {
                const filtered = allCourses.filter(c =>
                    user.registeredCourses.includes(c._id)
                );
                setCourses(filtered);
            });
    }, [user]);

    function handleDrop(courseId) {
        fetch(`http://localhost:5000/api/users/cart/${courseId}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                toast.warn("Course removed from your schedule");

                setUser(prev => ({
                    ...prev,
                    registeredCourses: data.registeredCourses
                }));

                setCourses(courses.filter(c => c._id !== courseId));
            });
    }

    return (
        <div>
            <h1>My Schedule</h1>

            {courses.length === 0 && <p>You have not registered for any courses yet.</p>}

            {courses.map(course => (
                <div key={course._id} style={styles.card}>
                    <h3>{course.name}</h3>
                    <p>{course.subject}</p>
                    <p>{course.credits} credits</p>

                    <button
                        onClick={() => handleDrop(course._id)}
                        style={styles.dropButton}
                    >
                        Drop Course
                    </button>
                </div>
            ))}
        </div>
    );
}

const styles = {
    card: {
        padding: "1rem",
        marginBottom: "1rem",
        border: "1px solid #ddd",
        borderRadius: "6px",
    },
    dropButton: {
        background: "#d9534f",
        color: "white",
        border: "none",
        padding: "0.4rem 0.8rem",
        borderRadius: "4px",
        cursor: "pointer",
    },
};
