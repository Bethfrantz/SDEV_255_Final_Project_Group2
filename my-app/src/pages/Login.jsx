import React, { useState } from "react";

export default function Login({ setUser }) {
    const [form, setForm] = useState({ username: "", password: "" });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    setUser(data); // store user info in state
                }
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <input name="username" placeholder="Username" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />

            <button type="submit">Login</button>
        </form>
    );
}

