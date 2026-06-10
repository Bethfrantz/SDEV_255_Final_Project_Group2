import React from "react";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">

                <div className="footer-section">
                    <h3 className="footer-title">CourseApp</h3>
                    <p className="footer-text">
                        Empowering students and teachers through modern learning tools.
                    </p>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Quick Links</h4>
                    <ul className="footer-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/courses">Courses</a></li>
                        <li><a href="/login">Login</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Contact</h4>
                    <p className="footer-text">support@courseapp.com</p>
                    <p className="footer-text">© {new Date().getFullYear()} CourseApp</p>
                </div>

            </div>
        </footer>
    );
}
