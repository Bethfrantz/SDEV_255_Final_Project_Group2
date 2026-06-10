import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
    function handleLogout() {
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">CourseApp</div>

                <div className="nav-links">
                    <NavLink to="/" className="nav-link">
                        Home
                    </NavLink>

                    <NavLink to="/courses" className="nav-link">
                        Courses
                    </NavLink>

                    {user?.role === "Student" && (
                        <NavLink to="/my-schedule" className="nav-link">
                            My Schedule
                        </NavLink>
                    )}

                    {user?.role === "Teacher" && (
                        <NavLink to="/add-course" className="nav-link">
                            Add Course
                        </NavLink>
                    )}

                    {!user ? (
                        <>
                            <NavLink to="/login" className="nav-link">
                                Login
                            </NavLink>

                            <NavLink to="/register" className="nav-link">
                                Register
                            </NavLink>
                        </>
                    ) : (
                        <div className="user-section">
                            <span className="welcome">Welcome, {user.username}</span>
                            <button onClick={handleLogout} className="logout-btn">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

