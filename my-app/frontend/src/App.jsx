import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";
import MySchedule from "./pages/MySchedule";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
    const [user, setUser] = useState(null);

    // Auto-login on refresh
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({
                    username: decoded.username,
                    role: decoded.role,
                    registeredCourses: decoded.registeredCourses || []
                });
            } catch (err) {
                localStorage.removeItem("token");
            }
        }
    }, []);

    // Protected Route wrapper
    function ProtectedRoute({ children }) {
        if (!user) {
            return <Navigate to="/login" replace />;
        }
        return children;
    }

    return (
        <>
            <NavBar user={user} setUser={setUser} />

            {/* Toast notifications */}
            <ToastContainer position="top-right" autoClose={2000} />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login setUser={setUser} />} />

                <Route
                    path="/courses"
                    element={<Courses user={user} setUser={setUser} />}
                />

                <Route
                    path="/my-schedule"
                    element={
                        <ProtectedRoute>
                            <MySchedule user={user} setUser={setUser} />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-course"
                    element={
                        <ProtectedRoute>
                            <AddCourse />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-course/:id"
                    element={
                        <ProtectedRoute>
                            <EditCourse />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
}





