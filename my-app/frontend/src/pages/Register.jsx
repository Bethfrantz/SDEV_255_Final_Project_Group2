import React, { useState } from "react";
import Layout from "../components/Layout";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "Student"
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        fetch("http://localhost:5000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(data => {
                setLoading(false);

                if (data.error) {
                    setError(data.error);
                    return;
                }

                alert("Account created!");
                window.location.href = "/login";
            })
            .catch(() => {
                setLoading(false);
                setError("Something went wrong. Try again.");
            });
    }

    return (
        <Layout hideFooter={true}>
            <div className="auth-container fade-in">
                <h2>Create Account</h2>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">

                    {/* Full Name */}
                    <div className="input-wrapper">
                        <span className="input-icon">📛</span>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="input-wrapper">
                        <span className="input-icon">📧</span>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password with toggle */}
                    <div className="input-wrapper">
                        <span className="input-icon">🔒</span>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </span>
                    </div>

                    {/* Role Selector */}
                    <select name="role" onChange={handleChange}>
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                    </select>

                    {/* Submit Button */}
                    <button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Register"}
                    </button>
                </form>

                <div className="auth-footer">
                    <span>Already have an account? </span>
                    <a href="/login">Login</a>
                </div>
            </div>
        </Layout>
    );
}
