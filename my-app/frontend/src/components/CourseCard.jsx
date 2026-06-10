import React from "react";
import { Link } from "react-router-dom";
import "./CourseCard.css";

export default function CourseCard({
    title,
    description,
    category,
    credits,
    isTeacher,
    isStudent,
    isRegistered,
    onDelete,
    onRegister,
    editLink
}) {
    return (
        <div className="course-card">
            <h3 className="course-title">{title}</h3>
            <p className="course-description">{description}</p>

            <div className="course-meta">
                <span className="course-tag">{category}</span>
                <span className="course-credits">{credits} credits</span>
            </div>

            <div className="course-actions">
                {isTeacher && (
                    <>
                        <Link to={editLink} className="course-edit-btn">Edit</Link>
                        <button onClick={onDelete} className="course-delete-btn">Delete</button>
                    </>
                )}

                {isStudent && (
                    isRegistered ? (
                        <span className="course-registered">Registered</span>
                    ) : (
                        <button onClick={onRegister} className="course-register-btn">
                            Register
                        </button>
                    )
                )}
            </div>
        </div>
    );
}
