import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditCourse() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        subject: "",
        credits: ""
    });

    // Load existing course data
    useEffect(() => {
        fetch(`http://localhost:5000/courses/${id}`)
            .then(res => res.json())
            .then(data => {
                setForm({
                    name: data.name,
                    description: data.description,
                    subject: data.subject,
                    credits: data.credits
                });
            });
    }, [id]);

    // Handle form changes
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // Submit updated course
    function handleSubmit(e) {
        e.preventDefault();

        fetch(`http://localhost:5000/courses/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(() => {
                alert("Course updated!");
                navigate("/courses");
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Course</h2>

            <input
                name="name"
                value={form.name}
                placeholder="Course Name"
                onChange={handleChange}
            />

            <input
                name="description"
                value={form.description}
                placeholder="Description"
                onChange={handleChange}
            />

            <input
                name="subject"
                value={form.subject}
                placeholder="Subject Area"
                onChange={handleChange}
            />

            <input
                name="credits"
                value={form.credits}
                placeholder="Credits"
                onChange={handleChange}
            />

            <button type="submit">Save Changes</button>
        </form>
    );
}
