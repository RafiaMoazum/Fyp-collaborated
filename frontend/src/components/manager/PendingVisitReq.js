import React from 'react'
import { useState, useEffect } from 'react';
import './CustomerInfo.css'
import { useParams } from 'react-router-dom';

export default function PendingVisitReq() {
  const { hostelId } = useParams();
  const[managerData, setmanagerData]=useState({ name: 'Manager' });
  const [bookingDetails, setBookingDetails] = useState([]);

  const fetchManagerData = async () =>{
      
    try{
      const res = await fetch('/managerData',{
         
        method:"GET",
        headers:{
           Accept:"application/json",
           "Content-Type":"application/json"
        },
        credentials:"include"
      });
      
       const data= await res.json();
       console.log(`name= ${data.name}`);
       //console.log(`data=: ${data}`);

       setmanagerData(data);
       
       

        if(res.status !== 200)
        {
          const error= new Error(res.error);
          throw error;
        }

    }catch(err){
      console.log(err);
      
    }
}

  useEffect(() => {
    const fetchPendingVisits = async () => {
      try {
        const res = await fetch(`/pendingVisits/${hostelId}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          console.log(`Pending===: ${JSON.stringify(data)}`);
          setBookingDetails(data.pendingBookings);
          console.log(`data.pendingBookings=: ${JSON.stringify(data.pendingBookings)}`);

        } else {
          const errorData = await res.json();
          throw new Error(`Error fetching data: ${errorData.error}`);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPendingVisits();
    fetchManagerData();
  }, [hostelId]);


  const handleAllow = async (bookingId,userEmail) => {
    window.alert(`Allow clicked for bookingId: ${bookingId}`);
    console.log(`Allow clicked for bookingId: ${bookingId}`);
    console.log(`Manager's Email: ${managerData.email}`); 
    
    try {
      
      const res = await fetch('/confirmVisit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: managerData.email,
          to: userEmail,
          subject: 'Booking Approved',
          text: `Your Visit has been approved!>💌 ${managerData.email}`,
          
        }),
      });
  
      if (res.status === 200) {
        window.alert('Email sent successfully');
        console.log('Email sent successfully');
      } else {
        const error = await res.json();
        console.error('Error:', error);
        window.alert('An error occurred while sending the email');
      }
    } catch (err) {
      console.error(err);
      window.alert('An error occurred while sending the email');
    }
  };
	 
  const handleReject = async (bookingId,userEmail) => {
    window.alert(`Reject clicked for bookingId: ${bookingId}`)
    console.log(`Reject clicked for bookingId: ${bookingId}`);
    try {
      
      const res = await fetch('/rejectVisit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: managerData.email,
          to: userEmail,
          subject: 'Sorry!',
          text: `Your request for visit hasn't been approved. Please try again another day!>💌 ${managerData.email}`,
          
        }),
      });
  
      if (res.status === 200) {
        window.alert('Email sent successfully');
        console.log('Email sent successfully');
      } else {
        const error = await res.json();
        console.error('Error:', error);
        window.alert('An error occurred while sending the email');
      }
    } catch (err) {
      console.error(err);
      window.alert('An error occurred while sending the email');
    }
  };
	
  return (
    <>
      <div className="booking-list-container">
        {bookingDetails.map((book) => (
        <div className="booking-item" key={book._id}>
          <div className="booking-details">
            <div>
              <p><b>Name:</b> {book.name}</p>
            </div>
            <div>
              <p><b>CNIC:</b> {book.cnic}</p>
            </div>
            <div>
              <p><b>Phone:</b> {book.phone}</p>
            </div>
            <div>
              <p><b>Email:</b> {book.email}</p>
            </div>
            <div>
              <p><b>Date:</b> {book.date}</p>
            </div>
          </div>
          <div>
          <button
            onClick={() => handleAllow(book._id, book.email)}
            className='confirmed'>
            Confirm
          </button>
          <button
            onClick={() => handleReject(book._id, book.email)}
            className='rejected'>
            Reject
          </button>
          </div>
      </div>
      ))}
    </div>
  </>
  )
}
