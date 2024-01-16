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
    <form className="form " onSubmit={handleSubmit}>
      <div className="form-group ">
        <label className="form-lab">
          Name:
          <input
            className="form-input form-control"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-lab">
          Email:
          <input
            className="form-input form-control"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-lab">
          Subject:
          <input
            className="form-input form-control"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-lab">
          Message:
          <textarea
            className="form-input form-control"
            name="msg"
            value={formData.msg}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group text-center">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}

export default ContactForm;