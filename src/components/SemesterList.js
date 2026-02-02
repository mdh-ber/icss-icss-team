import React from "react";
import axios from "axios";

function SemesterList({ semesters, fetchSemesters, setEditingSemester }) {

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/semesters/${id}`);
            fetchSemesters();
        } catch (err) {
            console.error("Error deleting semester:", err);
        }
    };

    return (
        <div>
            <h2>All Semesters</h2>
            <table border="1" cellPadding="5">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Acronym</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {semesters.map((semester) => (
                    <tr key={semester.id}>
                        <td>{semester.name}</td>
                        <td>{semester.acronym}</td>
                        <td>{semester.startDate}</td>
                        <td>{semester.endDate}</td>
                        <td>
                            <button onClick={() => setEditingSemester(semester)}>Edit</button>
                            <button onClick={() => handleDelete(semester.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SemesterList;
