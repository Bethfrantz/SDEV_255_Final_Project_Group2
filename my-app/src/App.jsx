import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Login from "./pages/Login";

const [user, setUser] = useState(null);

export default function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/add-course" element={<AddCourse />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/edit-course/:id" element={<EditCourse />} />




            </Routes>
        </Layout>
    );
}




