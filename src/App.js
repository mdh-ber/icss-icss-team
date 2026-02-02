import React, { useState, useEffect } from "react";
import SemesterForm from "./components/SemesterForm";
import SemesterList from "./components/SemesterList";
import axios from "axios";

function App() {
    const [semesters, setSemesters] = useState([]);
    const [editingSemester, setEditingSemester] = useState(null);

    // Fetch semesters from backend
    const fetchSemesters = async () => {
        try {
            const res = await axios.get("/api/semesters");
            setSemesters(res.data);
        } catch (err) {
            console.error("Error fetching semesters:", err);
        }
    };

    const clearEditing = () => setEditingSemester(null);

    useEffect(() => {
        fetchSemesters();
    }, []);

    return (
        <div>
            <h1>University AI Scheduler</h1>

            {/* Form only once */}
            <SemesterForm
                fetchSemesters={fetchSemesters}
                editingSemester={editingSemester}
                clearEditing={clearEditing}
            />

            {/* Table */}
            <SemesterList
                semesters={semesters}
                fetchSemesters={fetchSemesters}
                setEditingSemester={setEditingSemester}
            />
        </div>
    );
}

export default App;
