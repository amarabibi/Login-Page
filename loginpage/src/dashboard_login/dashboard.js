import React, { useState } from "react";
import { motion } from "framer-motion";
import "../App.css";
// Import external CSS file

export default function StudentsPage() {
  const [students, setStudents] = useState([
    { id: 1, name: "Ali Khan", grade: "A", email: "ali@example.com" },
    { id: 2, name: "Sara Ahmed", grade: "B", email: "sara@example.com" },
  ]);
  const [formData, setFormData] = useState({ name: "", grade: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.grade || !formData.email) return;

    if (editingId) {
      setStudents(
        students.map((s) => (s.id === editingId ? { ...s, ...formData } : s))
      );
      setEditingId(null);
    } else {
      const newStudent = { id: Date.now(), ...formData };
      setStudents([...students, newStudent]);
    }
    setFormData({ name: "", grade: "", email: "" });
  };

  const handleEdit = (id) => {
    const student = students.find((s) => s.id === id);
    setFormData({
      name: student.name,
      grade: student.grade,
      email: student.email,
    });
    setEditingId(id);
  };

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className="students-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="students-container"
      >
        <h1 className="students-title">🎓 Student Management System</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="students-form">
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="text"
            name="grade"
            placeholder="Grade"
            value={formData.grade}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
          <button type="submit" className="submit-btn">
            {editingId ? "Update Student" : "Add Student"}
          </button>
        </form>

        {/* Table */}
        <div className="table-container">
          <table className="students-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Grade</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, index) => (
                <tr
                  key={s.id}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <td>{s.name}</td>
                  <td>{s.grade}</td>
                  <td>{s.email}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(s.id)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
