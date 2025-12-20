import React from "react";

export default function Home() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome to My App</h1>
            <p style={styles.subtitle}>Your learning journey starts here.</p>
        </div>
    );
}

const styles = {
    container: {
        padding: "4rem",
        textAlign: "center",
    },
    title: {
        fontSize: "3rem",
        marginBottom: "1rem",
    },
    subtitle: {
        fontSize: "1.5rem",
        color: "#555",
    },
};
