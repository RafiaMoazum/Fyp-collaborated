import React, { useState } from 'react';
import './UserSignupForm.css';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useRoomContext } from './RoomContext';
import { useParams } from 'react-router-dom';


function BookVisitForm() {
    const{hostelId}= useParams();
  const navigate= useNavigate();
  const [UserData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    cnic:'',
    date: '',
    time:'',
    
  });

  let name,value;
  const handleInputChange = (event) => {
    name = event.target.name;
    value=event.target.value;
    setUserData({ ...UserData, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  }

  //Fetch Data from form using Fetch API
 const bookVisit = async (e) => {
    e.preventDefault();
    const { name, email,phone,cnic,date,time} = UserData;

    const res = await fetch(`/applyVisit/${hostelId}`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name, email, phone, cnic, date,time
        })
    });

    // Check response status
    if (res.status === 422) {
        // Handle the error case
        const errorData = await res.json();
        window.alert(`Error in Booking: ${errorData.error}`);
        console.log(`Error in Booking: ${errorData.error}`);
    } else {
        // Handle the success case
        //const data = await res.json();
        window.alert("Visit Request Sent. Wait for the response✌");
        console.log("Visit Request Sent. Wait for the response✌");
        
    }
}


  return (
    <form method="POST" className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">
          Name:
          <input
            className="form-input"
            type="text"
            name="name"
            value={UserData.name}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          CNIC:
          <input
            className="form-input"
            type="text"
            name="cnic"
            value={UserData.cnic}
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
            value={UserData.phone}
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
            value={UserData.email}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          Select Date:
          <input
            className="form-input"
            type="date"
            name="date"
            value={UserData.date}
            onChange={handleInputChange}
          />
        </label>
      </div>

      
      <div className="form-group">
        <label className="form-label">
          Select Time:
          <input
            className="form-input"
            type="time"
            name="time"
            value={UserData.time}
            onChange={handleInputChange}
          />
        </label>
      </div>
      
      
      <input className="form-register" type="submit" value="Book Visit" onClick={bookVisit} />
      
    </form>
    
  );
}

export default BookVisitForm;