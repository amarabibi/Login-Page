import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Example valid credentials
  const validUsers = [
    { username: "admin", password: "12345" },
    { username: "teacher", password: "abc123" },
    { username: "student", password: "pass2025" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      setError("⚠️ Please fill in all fields.");
      return;
    }

    const userFound = validUsers.find(
      (user) =>
        user.username.toLowerCase() === username.toLowerCase() &&
        user.password === password
    );

    if (userFound) {
      setSuccess(`✅ Welcome, ${username}! Redirecting...`);
      setError("");

      setTimeout(() => {
        navigate("/students"); // ✅ Redirect to Students Page
      }, 1500);
    } else {
      setError("❌ Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left Image */}
        <div className="login-left">
          <img
            src="/images/access-control-system-abstract-concept.png"
            alt="Login illustration"
            className="login-image"
          />
        </div>

        {/* Right Login Form */}
        <div className="login-right">
          <h2 className="login-title">School Management Login</h2>

          <form onSubmit={handleSubmit} className="login-form">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />

            {error && <p className="error-text">{error}</p>}
            {success && <p className="success-text">{success}</p>}

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <p className="footer-text">© 2025 School Management System</p>
        </div>
      </div>
    </div>
  );
}
