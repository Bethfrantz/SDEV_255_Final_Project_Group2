import React from "react";
import "./Hero.css";

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title">Build Your Future With Quality Courses</h1>
                <p className="hero-subtitle">
                    Explore programs, learn new skills, and take the next step in your education journey.
                </p>

                <a href="/courses" className="hero-button">
                    Browse Courses
                </a>
            </div>
        </section>
    );
}
