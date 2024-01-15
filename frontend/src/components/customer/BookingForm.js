import React, { useState } from 'react';
import './BookingForm.css';
import { useNavigate } from 'react-router-dom';
import { useRoomContext } from './RoomContext';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";


function BookingForm() {
    const { roomId } = useRoomContext();
    const { hostelId } = useParams();

  const navigate= useNavigate();
  const [bookingData, setbookingData] = useState({
    
    checkIn_date: '',
    checkOut_date: ''
  });

  let name,value;
  const handleInputChange = (event) => {
    name = event.target.name;
    value=event.target.value;
    setbookingData({ ...bookingData, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  }

  //Fetch Data from form using Fetch API
 const BookRoom = async (e) => {
    e.preventDefault();
    const { checkIn_date,checkOut_date} = bookingData;

    const res = await fetch(`/apply/${roomId}`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            checkIn_date,checkOut_date,roomId
        })
    });

    // Check response status
    if (res.status === 422) {
        // Handle the error case
        const errorData = await res.json();
        window.alert(`Room couldn't be Booked: ${errorData.error}`);
        console.log(`Room couldn't be Booked: ${errorData.error}`);
    } else {
        // Handle the success case
        const data = await res.json();
        window.alert("Room Booking Applied successfully. Response will be send to your email soon✌");
        console.log("Room Booking Applied successfully. Response will be send to your email soon✌");
        console.log(`RoomId from BookingForm.js= ${roomId}`)
        //navigate(`/RoomsDisplay/${hostelId}`);
    }
}


  return (
    <form method="POST" className="form1" onSubmit={handleSubmit}>
      
     
      
      <div className="form-group">
        <label className="form-label">
          Check-In Date
          <input
            className="form-input"
            type="date"
            name="checkIn_date"
            value={bookingData.checkIn_date}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Check-Out Date(Optional)
          <input
            className="form-input"
            type="date"
            name="checkOut_date"
            value={bookingData.checkOut_date}
            onChange={handleInputChange}
          />
        </label>
      </div>
     
      <input className="form-register" type="submit" value="Submit" onClick={BookRoom} />
      
    </form>
    
  );
}

export default BookingForm;