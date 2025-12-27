import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar({ user, setUser }) {
    function handleLogout() {
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>CourseApp</div>

            <div style={styles.links}>
                <NavLink
                    to="/"
                    style={({ isActive }) =>
                        isActive ? { ...styles.link, ...styles.active } : styles.link
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/courses"
                    style={({ isActive }) =>
                        isActive ? { ...styles.link, ...styles.active } : styles.link
                    }
                >
                    Courses
                </NavLink>

                {/* Student-only: My Schedule */}
                {user?.role === "Student" && (
                    <NavLink
                        to="/my-schedule"
                        style={({ isActive }) =>
                            isActive ? { ...styles.link, ...styles.active } : styles.link
                        }
                    >
                        My Schedule
                    </NavLink>
                )}

                {/* Teacher-only: Add Course */}
                {user?.role === "Teacher" && (
                    <NavLink
                        to="/add-course"
                        style={({ isActive }) =>
                            isActive ? { ...styles.link, ...styles.active } : styles.link
                        }
                    >
                        Add Course
                    </NavLink>
                )}

                {/* Auth section */}
                {!user ? (
                    <NavLink
                        to="/login"
                        style={({ isActive }) =>
                            isActive ? { ...styles.link, ...styles.active } : styles.link
                        }
                    >
                        Login
                    </NavLink>
                ) : (
                    <div style={styles.userSection}>
                        <span style={styles.welcome}>Welcome, {user.username}</span>
                        <button onClick={handleLogout} style={styles.logoutButton}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        background: "var(--primary)",
        color: "white",
    },
    logo: {
        fontSize: "1.5rem",
        fontWeight: "bold",
    },
    links: {
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
    },
    link: {
        color: "white",
        textDecoration: "none",
        fontSize: "1.1rem",
        padding: "0.25rem 0.5rem",
        borderRadius: "4px",
    },
    active: {
        background: "rgba(255,255,255,0.2)",
    },
    userSection: {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
    },
    welcome: {
        fontSize: "1rem",
    },
    logoutButton: {
        background: "#d9534f",
        color: "white",
        border: "none",
        padding: "0.3rem 0.6rem",
        borderRadius: "4px",
        cursor: "pointer",
    },
};
