import React, { useState } from "react";
import Layout from "../components/Layout";

export default function Login({ setUser }) {
    const [form, setForm] = useState({ username: "", password: "" });
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

        fetch("http://localhost:5000/login", {
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

                if (data.token) {
                    localStorage.setItem("token", data.token);
                    setUser(data);
                }
            })
            .catch(() => {
                setLoading(false);
                setError("Something went wrong. Try again.");
            });
    }

    return (
        <Layout hideFooter={true}>
            <div className="auth-container fade-in">
                <form onSubmit={handleSubmit} className="auth-form">
                    <h2>Login</h2>

                    {error && <div className="auth-error">{error}</div>}

                    {/* Username */}
                    <div className="input-wrapper">
                        <span className="input-icon">👤</span>
                        <input
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password with toggle */}
                    <div className="input-wrapper">
                        <span className="input-icon">🔒</span>
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
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

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="auth-footer">
                    <span>Don't have an account? </span>
                    <a href="/register">Register</a>
                </div>
            </div>
        </Layout>
    );
}
