import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import BlueHeader2 from './BlueHeader2'
import './CustomerInfo.css'
import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Notification() {
  const { hostelId } = useParams();
  const [bookingDetails, setBookingDetails] = useState([]);
  const[managerData, setManagerData]=useState({ name: 'Manager' });
  const navigate = useNavigate();


  const fetchManagerData = async () => {
    try {
      const res = await fetch('/managerData', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (res.status === 200) {
        const data = await res.json();
        console.log(`Manager data: ${JSON.stringify(data)}`);
        
        // Ensuring that managerData has the correct structure
        setManagerData({
          name: data.name,
          email: data.email, 
        });
  
        if (!data.email) {
          console.error('Manager email not available');
          
        }
      } else {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/loginPage");
    }
  };
  
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const res = await fetch(`/pendingBookings/${hostelId}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (res.status === 200) {
          const data = await res.json();
          console.log(`Booking details: ${JSON.stringify(data)}`);
          setBookingDetails(data.bookings);
        } else {
          const error = new Error(res.error);
          throw error;
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookingDetails();
    fetchManagerData();
  }, [hostelId]);


  const [confirmationStatus, setConfirmationStatus] = useState({});

  const handleAllow = async (bookingId, userEmail) => {
    window.alert(`Accept clicked for bookingId: ${bookingId}`);
    console.log(`Accept clicked for bookingId: ${bookingId}`);
    console.log(`Manager's Email: ${managerData.email}`); 
    
    try {
      
      const res = await fetch('/acceptEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: userEmail,
          subject: 'Booking Accepted',
          text: `Your booking has been approved!>💌 ${managerData.email}`,
          sender: managerData.email,
        }),
      });
  
      if (res.status === 200) {
        window.alert('Email sent successfully');
        console.log('Email sent successfully');
        setConfirmationStatus((prevStatus) => ({
          ...prevStatus,
          [bookingId]: true,
        }));
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
  
  const handleReject =  async (bookingId, userEmail)=> {
    window.alert(`Reject clicked for bookingId: ${bookingId}`)
    console.log(`Reject clicked for bookingId: ${bookingId}`);
    console.log(`Manager's Email: ${managerData.email}`); 
    
    try {
      
      const res = await fetch('/rejectEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: userEmail,
          subject: 'Booking Not Accepted',
          text: `Your booking has not been accepted! Try again later>💌 ${managerData.email}`,
          sender: managerData.email,
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

  const handleConfirm = (bookingId) => {
    window.alert(`Confirm clicked for bookingId: ${bookingId}`);
    console.log(`Confirm clicked for bookingId: ${bookingId}`);
    
  };
	
  return (
    <>
    <Navbar/>
    <BlueHeader2/>
    <div>
      <Row>
        <Col xs={4} sm={4} md={2} lg={2}>
          <div>
            <div className='side'>
              <nav>
                <ul>
                  <li>{managerData && <h2>{managerData.name}</h2>}</li>
                  <li><Link to="/hostelsPage" style={{textDecoration: "none", color: "white"}} >Home</Link></li>
                  <div style={{ border: "1px solid white", margin: "10px 0" }}></div>
                  <li><Link to={`/RoomStatus/${hostelId}`} style={{textDecoration: "none", color: "white"}} >Rooms</Link></li>
                  <div style={{ border: "1px solid white", margin: "10px 0" }}></div>
                  <li><Link to={`/CustomerInfo/${hostelId}`} style={{textDecoration: "none", color: "white"}} >Customer Information</Link></li>
                  <div style={{ border: "1px solid white", margin: "10px 0" }}></div>
                  <li><Link to={`/Notification/${hostelId}`} style={{textDecoration: "none", color: "white"}} >Notification</Link> </li>
                  <div style={{ border: "1px solid white", margin: "10px 0" }}></div>
                 
                  <li><Link to="" style={{textDecoration: "none", color: "white"}} >Messages</Link></li>
                  <div style={{ border: "1px solid white", margin: "10px 0" }}></div>
                  <li><Link to="" style={{textDecoration: "none", color: "white"}} >Logout</Link></li>
                  <div style={{ border: "1px solid white", margin: "10px 0" }}></div>
                </ul>
              </nav>
            </div>
          </div>
        </Col>
        <Col xs={8} sm={8} md={10} lg={10}>
        <section className="form-container">
        <table>
        <thead>
          <tr>
              <th>Room</th>
            <th>Name</th>
            <th>CNIC Number</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Price</th>
           <th>Check In date</th>
            <th>Check Out date</th>
          </tr>
        </thead>
        <tbody>
    {bookingDetails.map((booking, index) => (
      <tr key={index}>
        {booking.rooms.map((room, roomIndex) => (
          <React.Fragment key={roomIndex}>
            <td>{room.roomNumber}</td>
            
          </React.Fragment>
        ))}
        {booking.users.map((user, userIndex) => (
          <React.Fragment key={userIndex}>
            <td>{user.name}</td>
            <td>{user.cnic}</td>
            <td>{user.phone}</td>
            <td>{user.email}</td>

          </React.Fragment>
        ))}
        {booking.rooms.map((room, roomIndex) => (
          <React.Fragment key={roomIndex}>
            <td>{room.price}</td>
           
          </React.Fragment>
        ))}
        <td>{booking.checkIn_date}</td>
        <td>{booking.checkOut_date}</td>
        <td>
        {confirmationStatus[booking.bookingId] ? (
          <button onClick={() => handleConfirm(booking.bookingId)}
          style={{ backgroundColor: 'green', color: 'white' }}>
            Confirmed
          </button>
        ) : (
          <button
            onClick={() => handleAllow(booking.bookingId, booking.users[0].email)}
            style={{ backgroundColor: 'green', color: 'white' }}
          >
            Accept
          </button>
        )}
      </td>
      {/* <td>
        <button onClick={() => handleAllow(booking.bookingId, booking.users[0].email)}
        style={{ backgroundColor: 'green', color: 'white' }}>
                                                        
         Accept
        </button>
      </td> */}
                      <td>
                        <button
                          onClick={() => handleReject(booking.bookingId, booking.users[0].email)}
                          style={{ backgroundColor: 'red', color: 'white' }}
                        >
                          Reject
                        </button>
                      </td>
      </tr>
    ))}

          
        </tbody>
      </table>

        </section>

        </Col>
      </Row>  
    </div>     

    <Link to={`/PendingVisitReq/${hostelId}`}>
    <h1>Pending Visit Requests</h1>
    </Link>        
    </>
  )
}