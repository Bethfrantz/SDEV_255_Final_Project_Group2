import React from "react";
import NavBar from "./NavBar";

export default function Layout({ children }) {
    return (
        <div style={styles.wrapper}>
            <NavBar />
            <main style={styles.main}>{children}</main>
        </div>
    );
}

const styles = {
    wrapper: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    main: {
        flex: 1,
        padding: "2rem",
    },
};
