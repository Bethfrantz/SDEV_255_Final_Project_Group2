import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout({ children, user, setUser, hideFooter = false }) {
    return (
        <div className="layout-wrapper">
            <NavBar user={user} setUser={setUser} />
            <main className="layout-main">{children}</main>
            {!hideFooter && <Footer />}
        </div>
    );
}


