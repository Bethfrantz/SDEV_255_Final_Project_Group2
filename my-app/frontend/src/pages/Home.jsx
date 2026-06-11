import React from "react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";

export default function Home({ user, setUser }) {
    return (
        <Layout user={user} setUser={setUser}>
            <Hero />
            {/* Add more homepage sections here later */}
        </Layout>
    );
}

