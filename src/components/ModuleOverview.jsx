import React, { useEffect, useState } from "react";
import { getModules, deleteModule } from "../services/moduleService";
import ModuleForm from "./ModuleForm";
import "../styles/module.css";

const ModuleOverview = () => {
    const [modules, setModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState(null);

    useEffect(() => {
        loadModules();
}, []);

const loadModules = async () => {
    const response = await getModules();
    setModules(response.data);
};

const handleDelete = async (id) => {
    await deleteModule(id);
    loadModules();
};

return (
    <div>
        <h2>Module Management - Planning Manager</h2>
        <ModuleForm
        selectedModule={selectedModule}
        refresh={loadModules}
        />
        <table border="1" width="100%">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Room</th>
                    <th>Sessions/Week</th>
                    <th>Semester</th>
                    <th>Duration</th>
                    <th>Students</th>
                    <th>Mode</th>
                    <th>Actions</th>
                
                </tr>
            </thead>
            <tbody>
                {modules.map((module) => (
                    <tr key={module.id}>
                        <td>{module.id}</td>
                        <td>{module.name}</td>
                        <td>{module.room}</td>
                        <td>{module.sessionsPerWeek}</td>
                        <td>{module.semester}</td>
                        <td>{module.duration}</td>
                        <td>{module.students}</td>
                        <td>{module.mode}</td>
                        <td>
                            <button onClick={() => setSelectedModule(module)}>Edit</button>
                            <button onClick={() => handleDelete(module.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
};

export default ModuleOverview;