import React, { useState, useEffect } from "react";
import { createModule, updateModule } from "../services/moduleService";

const ModuleForm = ({ selectedModule, refresh }) => {
    const [module, setModule] = useState({
        module_id: "",
        module_name: "",
        room_type: "",
        session_per_week: "",
        semester: "",
        duration: "",
        number_of_students: "",
        delivery_mode: "Onsite",
    });

    useEffect(() => {
        if (selectedModule) setModule(selectedModule);
    }, [selectedModule]);

    const handleChange = (e) => {
        setModule({ ...module, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedModule) {
            await updateModule(module.module_id, module);
        } else {
            await createModule(module);
        }
        refresh();
        setModule({
            module_id: "",
            module_name: "",
            room_type: "",
            session_per_week: "",
            semester: "",
            duration: "",
            number_of_students: "",
            delivery_mode: "Onsite",
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>{selectedModule ? "Edit Module" : "Add New Module"}</h3>

            <input name="module_id" placeholder="Module ID" value={module.module_id} onChange={handleChange} required />
            <input name="module_name" placeholder="Module Name" value={module.module_name} onChange={handleChange} required />
            <input name="room_type" placeholder="Room Type" value={module.room_type} onChange={handleChange} required />
            <input name="session_per_week" placeholder="Sessions/Week" value={module.session_per_week} onChange={handleChange} required />
            <input name="semester" placeholder="Semester" value={module.semester} onChange={handleChange} required />
            <input name="duration" placeholder="Duration" value={module.duration} onChange={handleChange} required />
            <input name="number_of_students" placeholder="Number of Students" value={module.number_of_students} onChange={handleChange} required />
            <select name="delivery_mode" value={module.delivery_mode} onChange={handleChange}>
                <option value="Onsite">Onsite</option>
                <option value="Online">Online</option>
            </select>

            <button type="submit">Save Module</button>
        </form>
    );
        };

export default ModuleForm;