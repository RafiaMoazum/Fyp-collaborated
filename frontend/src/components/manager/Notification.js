//my code
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
import { Container } from 'react-bootstrap';
import "./Notification.css"
import PendingVisitReq from './PendingVisitReq';
import Sidebar from './Sidebar'




export default function Notification() {
  const { hostelId } = useParams();
  const [bookingDetails, setBookingDetails] = useState([]);
  const[managerData, setManagerData]=useState({ name: 'Manager' });
  const[hostelData, setHostelData]=useState();

  const navigate = useNavigate();

  const [confirmationStatus, setConfirmationStatus] = useState(() => {
    try {
      const storedConfirmationStatus = localStorage.getItem('confirmationStatus');
      return storedConfirmationStatus ? JSON.parse(storedConfirmationStatus) : {};
    } catch (error) {
      console.error('Error parsing confirmationStatus from localStorage:', error);
      return {};
    }
  });
  

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
        //console.log(`Manager data: ${JSON.stringify(data)}`);
        
        
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
          //console.log(`Booking details: ${JSON.stringify(data)}`);
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

  useEffect(() => {
    localStorage.setItem('confirmationStatus', JSON.stringify(confirmationStatus));
  }, [confirmationStatus]);

  

  const handleAllow = async (bookingId, userEmail, userName, roomId, roomPrice) => {
    window.alert(`Accept clicked for bookingId: ${bookingId}`);
    try {
      // Fetch hostel information based on room ID
      const hostelResponse = await fetch(`/getHostelByRoomId/${roomId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
  
      if (hostelResponse.status === 200) {
        const hostelData = await hostelResponse.json();
        if (hostelData && hostelData.hostel) {
          const { name, address, phone, email } = hostelData.hostel;
        }
      }
        setHostelData(hostelData.hostel);
      
  
      const res = await fetch('/acceptEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: userEmail,
          subject: 'Booking Accepted',
          text: `Dear ${userName},
            Congratulations! We are delighted to inform you that your hostel room application has been accepted. We appreciate your choice in staying with us.
            To confirm your booking, kindly submit the required payment within the next 24 hours. Once we receive your payment, your booking will be officially confirmed, and you can look forward to a comfortable stay with us.
            Payment Details:
            Amount: ${roomPrice}
            Payment Method: Please submit the amount in any of the accounts mentioned below and send the receipt on
            this email address: ${hostelData.email}
            Accounts:
            Bank Account No. ${hostelData.bankAcc}
            EasyPaisa No. ${hostelData.easyPaisa}
            JazzCashNo. ${hostelData.jazzCash}
            Please note that if we do not receive your payment within the specified timeframe, your application will be canceled, and the room will be made available to other applicants.
            We look forward to welcoming you to our hostel. If you have any questions or need further assistance, feel free to contact us at ${hostelData.phone} or email at ${hostelData.email}.
            Thank you for choosing ${hostelData.name}.
            Best regards,
            ${managerData.name}
            ${hostelData.name}
            ${hostelData.address}
            ${managerData.email}`,
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
  
  
  const handleReject =  async (bookingId, userEmail,userName,roomId)=> {
    window.alert(`Reject clicked for bookingId: ${bookingId}`)
    //console.log(`Reject clicked for bookingId: ${bookingId}`);
    //console.log(`Manager's Email: ${managerData.email}`); 
    
    try 
    {
      // Fetch hostel information based on room ID
    const hostelResponse = await fetch(`/getHostelByRoomId/${roomId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

   
    
    if (hostelResponse.status === 200) {
      const hostelData = await hostelResponse.json();
      //console.log('hostelData:', hostelData);
      //console.log('hostelData.hostel:', JSON.stringify(hostelData.hostel))
      if (hostelData && hostelData.hostel) {
        const { name, address, phone, email } = hostelData.hostel;
      }
    
    }
      setHostelData(hostelData.hostel);
    
      
      const res = await fetch(`/rejectEmail/${bookingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: userEmail,
          subject: 'Regarding Your Hostel Room Application',
          text: `Dear ${userName},

          Thank you for applying for a room at ${hostelData.name}. We appreciate your interest in staying with us.
          
          After careful consideration, we regret to inform you that your hostel room application has not been accepted at this time. 
          We understand that this news may be disappointing, and we appreciate your understanding.
          
          We value your interest in our hostel and hope that you find suitable accommodation for your stay.
          
          Thank you for your consideration.
          
          Best regards,
          
          ${hostelData.name}
          ${hostelData.address}
          ${hostelData.phone}
          ${hostelData.email}`,
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

 const handleConfirm = async (bookingId) => {
    window.alert(`Confirm clicked for bookingId: ${bookingId}`);
    //console.log(`Confirm clicked for bookingId: ${bookingId}`);

    try {
        const res = await fetch(`/confirmBooking/${bookingId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.status === 201) {
            window.alert('Booking confirmed successfully');
            console.log('Booking confirmed successfully');
            setConfirmationStatus((prevStatus) => ({
                ...prevStatus,
                [bookingId]: true,
            }));
        } else {
            const error = await res.json();
            console.error('Error:', error);
            window.alert('An error occurred while confirming the booking');
        }
    } catch (err) {
        console.error(err);
        window.alert('An error occurred while confirming the booking');
    }
};

	
  return (
    <>
    <Navbar/>
    <BlueHeader2/>
    <Container fluid>
      <Row>
        <Col xs={4} sm={4} md={2} lg={2}>
        <Sidebar opt1="Hostel Profile" opt2="Notifications" opt3="Customer Info" opt4="Logout" />

          {/* <div className='side'>
              <nav>
                <ul>
                  <li>{managerData && <h2>{managerData.name}</h2>}</li>
                  <li><Link to="" style={{textDecoration: "none", color: "black"}} >Profile</Link></li>
                    <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                    <li><Link to={`/Notification/${hostelId}`} style={{textDecoration: "none", color: "black"}} >Notification</Link> </li>
                    <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                    <li><Link to="" style={{textDecoration: "none", color: "black"}} >Messages</Link></li>
                    <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                    <li><Link to="" style={{textDecoration: "none", color: "black"}} >Logout</Link></li>
                    <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                    </ul>
              </nav>
            </div> */}
        </Col>
        <Col xs={8} sm={8} md={10} lg={10}>
          <Container fluid className="form-container">
          <Row>
            <Col>
            <h5 className='head5'>
              New Booking Request:
            </h5>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col>
            <div className="booking-list-container">
              {bookingDetails.map((booking, index) => (
                <div className="booking-item" key={index}>
                  <div className="booking-details">
                    {booking.rooms.map((room, roomIndex) => (
                      <div key={roomIndex}>
                        <p> <b>Room No:</b> {room.roomNumber}</p>
                      </div>
                    ))}
                    {booking.users.map((user, userIndex) => (
                      <div key={userIndex}>
                        <div>
                          <p><b>Name:</b> {user.name} </p>
                        </div>
                      </div>
                    ))}
                    {booking.users.map((user, userIndex) => (
                      <div key={userIndex}>
                        <div>
                          <p><b>CNIC:</b> {user.cnic}</p>
                        </div>
                      </div>
                    ))}
                      {booking.users.map((user, userIndex) => (
                      <div key={userIndex}>
                        <div>
                          <p> <b>Phone:</b> {user.phone}</p>
                        </div>
                      </div>
                    ))}
                      {booking.users.map((user, userIndex) => (
                      <div key={userIndex}>
                        <div>
                          <p><b>Email:</b> {user.email}</p>
                        </div>
                      </div>
                    ))}
                    {booking.rooms.map((room, roomIndex) => (
                      <div key={roomIndex}>
                        <p><b>Rent:</b>  {room.price} </p>
                      </div>
                    ))}
                    <div>
                      <p><b>Check-in:</b> {booking.checkIn_date}</p>
                    </div>
                    <div>
                      <p><b>Check-out:</b> {booking.checkOut_date} </p>
                    </div>
                  </div>
                  <div >
                    {confirmationStatus[booking.bookingId] ? (
                      <button onClick={() => handleConfirm(booking.bookingId)} className="confirmed">
                        Confirmed
                      </button>
                    ) : (
                      <button onClick={() => handleAllow(booking.bookingId, booking.users[0].email,booking.users[0].name,booking.rooms[0]._id,booking.rooms[0].price)} className="accepted">
                        Accept
                      </button>
                    )}
                    <button onClick={() => handleReject(booking.bookingId, booking.users[0].email,booking.users[0].name,booking.rooms[0]._id)} className="rejected">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row>
            <Col>
              <h5 className='head5'>Pending Visit Requests</h5>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col>
              <PendingVisitReq/>
            </Col>
          </Row>
          </Container>
        </Col>
      </Row>  
    </Container>             
  </>
  )
}
