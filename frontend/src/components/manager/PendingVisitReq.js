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


  const handleAllow = async (bookingId, userEmail, userName, date, time, hostelId) => {
    window.alert(`Allow clicked for bookingId: ${bookingId}`);
    console.log(`Allow clicked for bookingId: ${bookingId}`);
    console.log(`user=====: ${userEmail}, ${userName}, ${date}, ${time}`);
    console.log(`Manager's Email: ${managerData.email}`);
  
    try 
    {
      // Fetch the entire hostel record based on hostelId
      const hostelRes = await fetch(`/getHostel/${hostelId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (!hostelRes.ok) {
        const errorData = await hostelRes.json();
        throw new Error(`Error fetching hostel data: ${errorData.error}`);
      }
  
      const hostelData = await hostelRes.json();
  
      
      const res = await fetch(`/confirmVisit/${bookingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: managerData.email,
          to: userEmail,
          subject: 'Regarding Your Hostel Visit Request',
          text: `Dear ${userName},
            We are pleased to inform you that your request to visit ${hostelData.name} has been accepted. We appreciate your interest in exploring our facilities.
            Details of Your Visit:
            Date: ${date}
            Time: ${time}
            Meeting Point: ${hostelData.name}
            
            We look forward to welcoming you and providing you with a comprehensive tour of our hostel. 
            If you have any specific questions or requests for the visit, please feel free to let us know in 
            advance.
            Should there be any changes kindly inform us at your earliest convenience. We hope this visit gives you valuable insights into our hostel.
            Thank you for choosing ${hostelData.name}. We look forward to meeting you soon.
            Best regards,
            ${managerData.name}
            ${hostelData.name}
            Address: ${hostelData.address}
            Phone No: ${hostelData.phone}
            Email: ${hostelData.email}
          `,
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
  
  const handleReject = async (bookingId,userEmail,userName) => {
    window.alert(`Reject clicked for bookingId: ${bookingId}`)
    console.log(`Reject clicked for bookingId: ${bookingId}`);
    try {

      // Fetch the entire hostel record based on hostelId
      const hostelRes = await fetch(`/getHostel/${hostelId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (!hostelRes.ok) {
        const errorData = await hostelRes.json();
        throw new Error(`Error fetching hostel data: ${errorData.error}`);
      }
  
      const hostelData = await hostelRes.json();
      
      const res = await fetch(`/rejectVisit/${bookingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: managerData.email,
          to: userEmail,
          subject: 'Regarding Your Hostel Visit Request',
          text: `Dear ${userName},

          Thank you for expressing your interest in visiting ${hostelData.name}. We appreciate your enthusiasm to explore our facilities.
          
          After careful consideration, we regret to inform you that your visit request for the specified date and time is not suitable. We encourage you to consider an alternative date or time.
          
          If you have specific preferences or constraints, please feel free to propose an alternative date and time that would be convenient for you. We strive to accommodate our visitors' schedules whenever possible.
          
          Alternatively, if you have any questions or would like further clarification on the decision, please do not hesitate to reach out to us at ${hostelData.phone} or email at ${hostelData.email}. We are more than happy to assist you in rescheduling your visit or addressing any concerns you may have.
          
          We value your interest in our hostel, and we hope to find a suitable arrangement for your visit in the near future.
          
          Thank you for considering ${hostelData.name}.
          
          Best regards,
          
          ${managerData.name}
          ${hostelData.name}
          Address: ${hostelData.address}
          Phone No: ${hostelData.phone}
          Email: ${hostelData.email}`,
          
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
            <div>
              <p><b>Time:</b> {book.time}</p>
            </div>
          </div>
          <div>
          <button
            onClick={() => handleAllow(book._id, book.email,book.name,book.date,book.time,book.hostelId)}
            className='confirmed'>
            Confirm
          </button>
          <button
            onClick={() => handleReject(book._id, book.email,book.name)}
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
