import { useEffect, useMemo, useState } from "react";
import api from "../api";

// --- CONSISTENT STYLES ---
const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
    maxWidth: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "15px",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    color: "#333",
  },
  searchBar: {
    padding: "8px 12px",
    width: "300px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "0.95rem",
    marginBottom: "15px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    border: "1px solid #ddd",
    fontSize: "0.9rem",
  },
  thead: {
    background: "#f2f2f2",
    borderBottom: "2px solid #ccc",
  },
  th: {
    textAlign: "left",
    padding: "10px 15px",
    fontWeight: "600",
    color: "#ffffff",
  },
  tr: {
    borderBottom: "1px solid #eee",
  },
  td: {
    padding: "10px 15px",
    verticalAlign: "middle",
  },
  // Badges for "Onsite/Online"
  statusBadge: (type) => {
    let bg = "#e2e6ea";
    let color = "#333";
    if (type === "Onsite") { bg = "#d1e7dd"; color = "#0f5132"; }
    else if (type === "Online") { bg = "#fff3cd"; color = "#664d03"; }
    else if (type === "Hybrid") { bg = "#cfe2ff"; color = "#084298"; }

    return {
      display: "inline-block",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "0.8rem",
      fontWeight: "bold",
      backgroundColor: bg,
      color: color,
      textAlign: "center",
      minWidth: "60px",
    };
  },
  btn: {
    padding: "6px 12px",
    borderRadius: "4px",
    border: "1px solid transparent",
    cursor: "pointer",
    fontSize: "0.9rem",
    marginLeft: "5px",
  },
  primaryBtn: { background: "#007bff", color: "white" },
  editBtn: { background: "#6c757d", color: "white" },
  deleteBtn: { background: "#dc3545", color: "white" },
  modalOverlay: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000,
  },
  modalContent: {
    background: "white", padding: "25px", borderRadius: "8px",
    width: "600px", maxWidth: "95%", maxHeight: "90vh", overflowY: "auto",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  },
  formGroup: { marginBottom: "15px" },
  label: { display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "0.9rem" },
  input: {
    width: "100%", padding: "8px", borderRadius: "4px",
    border: "1px solid #ccc", fontSize: "1rem", boxSizing: "border-box",
  },
};

export default function ModuleOverview() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [formMode, setFormMode] = useState("overview");
  const [editingId, setEditingId] = useState(null);

  const [draft, setDraft] = useState({
    moduleName: "",
    moduleCode: "",
    ects: 5,
    semester: 1,
    studyProgram: "",
    specialization: "",
    typeOfModule: "Lecture",
  });

  async function loadModules() {
    setLoading(true);
    try {
      const data = await api.getModules();
      setModules(Array.isArray(data) ? data : []);
    } catch (e) {
      alert("Error loading modules: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadModules();
  }, []);

  function openAdd() {
    setEditingId(null);
    setDraft({
      moduleName: "",
      moduleCode: "",
      ects: 5,
      semester: 1,
      studyProgram: "",
      specialization: "",
      typeOfModule: "Lecture",
      assesmentType: "Written Exam",
      
    });
    setFormMode("add");
  }

  function openEdit(row) {
    setEditingId(row.module_id);
    setDraft({
      moduleName: row.module_name,
      moduleCode: row.module_code,
      ects: row.ects,
      semester: row.semester,
      studyProgram: row.study_program,
      specialization: row.specialization || "",
      typeOfModule: row.type_of_module,
      assessmentType: row.assessment_type,
    });
    setFormMode("edit");
  }

  async function save() {
    if (!draft.moduleName.trim()) return alert("Module name is required");

    const payload = {
      module_name: draft.moduleName.trim(),
      module_code: draft.moduleCode.trim(),
      ects: Number(draft.ects),
      semester: Number(draft.semester),
      study_program: draft.studyProgram,
      specialization: draft.specialization,
      type_of_module: draft.typeOfModule,
      assessment_type: draft.assessmentType,
    };

    try {
      if (formMode === "add") {
        await api.createModule(payload);
      } else {
        await api.updateModule(editingId, payload);
      }
      await loadModules();
      setFormMode("overview");
    } catch (e) {
      alert("Backend error while saving module.");
    }
  }
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return modules;
    return modules.filter((m) =>
      m.module_name.toLowerCase().includes(q) ||
      m.module_code.toLowerCase().includes(q) ||
      m.study_program?.toLowerCase().includes(q)
    );
  }, [modules, query]);

  async function remove(id) {
    if (!window.confirm("Delete this module?")) return;
    try {
      await api.deleteModule(id);
      loadModules();
    } catch (e) {
      console.error(e);
      alert("Backend error while deleting module.");
    }
  }
return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Module Management</h2>
        <button style={{...styles.btn, ...styles.primaryBtn}} onClick={openAdd}>+ New Module</button>
      </div>

      <input
        style={styles.searchBar}
        placeholder="Search by name, code, or program..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading ? <p>Loading...</p> : (
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Code</th>
              <th style={styles.th}>Module Name</th>
              <th style={styles.th}>ECTS</th>
              <th style={styles.th}>Sem.</th>
              <th style={styles.th}>Study Program</th>
              <th style={styles.th}>Type / Assessment</th>
              <th style={{...styles.th, textAlign:'right'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.module_id} style={styles.tr}>
                <td style={styles.td}><code>{m.module_code}</code></td>
                <td style={styles.td}><strong>{m.module_name}</strong></td>
                <td style={styles.td}>{m.ects}</td>
                <td style={styles.td}>{m.semester}</td>
                <td style={styles.td}>{m.study_program}</td>
                <td style={styles.td}>
                    <small>{m.type_of_module} / {m.assessment_type}</small>
                </td>
                <td style={{...styles.td, textAlign:'right'}}>
                  <button style={{...styles.btn, ...styles.editBtn}} onClick={() => openEdit(m)}>Edit</button>
                  <button style={{...styles.btn, ...styles.deleteBtn}} onClick={() => remove(m.module_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* --- MODAL --- */}
      {(formMode === "add" || formMode === "edit") && (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'20px'}}>
                    <h3 style={{margin:0}}>{formMode === "add" ? "Define New Module" : "Edit Module Properties"}</h3>
                    <button onClick={() => setFormMode("overview")} style={{border:'none', background:'transparent', fontSize:'1.5rem', cursor:'pointer'}}>×</button>
                </div>

                <div style={{display:'flex', gap:'15px', marginBottom:'15px'}}>
                    <div style={{flex:2}}>
                        <label style={styles.label}>Module Name</label>
                        <input style={styles.input} value={draft.moduleName} onChange={e => setDraft({...draft, moduleName: e.target.value})} />
                    </div>
                    <div style={{flex:1}}>
                        <label style={styles.label}>Module Code</label>
                        <input style={styles.input} value={draft.moduleCode} onChange={e => setDraft({...draft, moduleCode: e.target.value})} />
                    </div>
                </div>

                <div style={{display:'flex', gap:'15px', marginBottom:'15px'}}>
                    <div style={{flex:1}}>
                        <label style={styles.label}>ECTS</label>
                        <input type="number" style={styles.input} value={draft.ects} onChange={e => setDraft({...draft, ects: e.target.value})} />
                    </div>
                    <div style={{flex:1}}>
                        <label style={styles.label}>Semester Number</label>
                        <input type="number" style={styles.input} value={draft.semester} onChange={e => setDraft({...draft, semester: e.target.value})} />
                    </div>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Study Program</label>
                    <input style={styles.input} value={draft.studyProgram} onChange={e => setDraft({...draft, studyProgram: e.target.value})} placeholder="e.g. Business Information Technology" />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Specialization</label>
                    <input style={styles.input} value={draft.specialization} onChange={e => setDraft({...draft, specialization: e.target.value})} />
                </div>

                <div style={{display:'flex', gap:'15px', marginBottom:'15px'}}>
                    <div style={{flex:1}}>
                        <label style={styles.label}>Module Types(aligned with room_type) </label>
                        <select style={styles.input} value={draft.typeOfModule} onChange={e => setDraft({...draft, typeOfModule: e.target.value})}>
                          <option value="Lecture">Lecture</option>
                          <option value="Computer Lab">Computer Lab</option>
                          <option value="Seminar">Seminar</option>
                        </select>
                    </div>
                    <div style={{flex:1}}>
                        <label style={styles.label}>Assessment Type</label>
                        <select style={styles.input} value={draft.assessmentType} onChange={e => setDraft({...draft, assessmentType: e.target.value})}>
                          <option value="Written Exam">Written Exam</option>
                          <option value="Project Work">Project Work</option>
                          <option value="Oral Exam">Oral Exam</option>
                        </select>
                    </div>
                </div>

                <div style={{marginTop: '25px', display:'flex', justifyContent:'flex-end', gap:'10px'}}>
                    <button style={{...styles.btn, background:'#f8f9fa', border:'1px solid #ddd'}} onClick={() => setFormMode("overview")}>Cancel</button>
                    <button style={{...styles.btn, ...styles.primaryBtn}} onClick={save}>Save Module</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}