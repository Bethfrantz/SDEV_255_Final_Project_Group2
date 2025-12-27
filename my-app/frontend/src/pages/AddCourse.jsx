import React, { useState } from "react";

export default function AddCourse() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        subject: "",
        credits: ""
    });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        fetch("http://localhost:5000/courses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(() => alert("Course added!"));
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Course</h2>

            <input name="name" placeholder="Course Name" onChange={handleChange} />
            <input name="description" placeholder="Description" onChange={handleChange} />
            <input name="subject" placeholder="Subject Area" onChange={handleChange} />
            <input name="credits" placeholder="Credits" onChange={handleChange} />

            <button type="submit">Add Course</button>
        </form>
    );
}
