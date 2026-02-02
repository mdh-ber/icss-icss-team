import React, { useState, useEffect } from "react";
import axios from "axios";

function SemesterForm({ fetchSemesters, editingSemester, clearEditing }) {
    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [acronym, setAcronym] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        if (editingSemester) {
            setId(editingSemester.id);
            setName(editingSemester.name);
            setAcronym(editingSemester.acronym);
            setStartDate(editingSemester.startDate);
            setEndDate(editingSemester.endDate);
        }
    }, [editingSemester]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, acronym, startDate, endDate };

        try {
            if (id) {
                await axios.put(`/api/semesters/${id}`, data);
            } else {
                await axios.post("/api/semesters", data);
            }
            fetchSemesters();
            resetForm();
        } catch (err) {
            console.error("Error submitting form:", err);
        }
    };

    const resetForm = () => {
        setId(null);
        setName("");
        setAcronym("");
        setStartDate("");
        setEndDate("");
        clearEditing();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{id ? "Edit Semester" : "Create Semester"}</h2>
            <div>
                <label>Name:</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Acronym:</label>
                <input value={acronym} onChange={(e) => setAcronym(e.target.value)} required />
            </div>
            <div>
                <label>Start Date:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </div>
            <div>
                <label>End Date:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </div>
            <button type="submit">{id ? "Update Semester" : "Create Semester"}</button>
            {id && <button type="button" onClick={resetForm}>Cancel</button>}
        </form>
    );
}

export default SemesterForm;
