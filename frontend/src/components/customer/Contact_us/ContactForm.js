import React, { useState } from 'react';
import './ContactForm.css'; 
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    msg: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">
          Name:
          <input
            className="form-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Phone:
          <input
            className="form-input"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Email:
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Subject:
          <input
            className="form-input"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
      <label className="form-label">
          Message:
          <input
            className="form-input"
            type="text"
            name="msg"
            value={formData.msg}
            onChange={handleInputChange}
          />
        </label>
        
      </div>
      <div style={{alignItems: "center",justifyContent: "center",display: "flex"}}>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      </div>
    </form>
  );
}

export default ContactForm;