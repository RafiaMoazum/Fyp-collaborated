import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from './Navbar'
import BlueHeader2 from './BlueHeader2'
import './CustomerInfo.css'
import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Container } from 'react-bootstrap';
export default function CustomerInfo() {
  const { hostelId } = useParams();
  const [bookingDetails, setBookingDetails] = useState([]);
  const[userData, setUserData]=useState({ name: 'Manager' });
  const navigate = useNavigate();


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

       setUserData(data);
       
       

        if(res.status !== 200)
        {
          const error= new Error(res.error);
          throw error;
        }

    }catch(err){
      console.log(err);
      navigate("/loginPage");
    }
}

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const res = await fetch(`/showBookings/${hostelId}`, {
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

    fetchManagerData();
    fetchBookingDetails();
  }, [hostelId]);

  return (
    <>
    <Navbar/>
    <BlueHeader2/>
    <Container fluid>
      <Row>
      <Col xs={4} sm={4} md={2} lg={2} className="d-none d-lg-block">
        <div >
            <div className='side'>
              <nav >
                <ul>
                  {userData && <h2>{userData.name}</h2>}
                  <li><Link to="" style={{textDecoration: "none", color: "black"}} >Profile</Link></li>
                  <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                  <li><Link to="" style={{textDecoration: "none", color: "black"}} >Notification</Link> </li>
                  <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                  <li><Link to="" style={{textDecoration: "none", color: "black"}} ></Link></li>
                  <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                  <li><Link to="" style={{textDecoration: "none", color: "black"}} >Logout</Link></li>
                  <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                </ul>
              </nav>
            </div>
          </div>
        </Col>
        <Col xs={8} sm={8} md={10} lg={10} className="d-none d-lg-block">
        <section className="form-container">
        <div className="form-cont table-responsive">
        <table className='table'>
        <thead>
          <tr>
              <th>Room</th>
            <th>Name</th>
            <th>CNIC Number</th>
            <th>Phone</th>
            <th>Price</th>
            <th>Total Capacity</th>
            <th>Remaining Capacity</th>
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
            </React.Fragment>
          ))}
          {booking.rooms.map((room, roomIndex) => (
            <React.Fragment key={roomIndex}>
              <td>{room.price}</td>
              <td>{room.capacity}</td>
              <td>{room.currentCapacity}</td>
            </React.Fragment>
          ))}
          <td>{booking.checkIn_date}</td>
          <td>{booking.checkOut_date}</td>
          </tr>
          ))}  
        </tbody>
        </table>
        </div>
        </section>
        </Col>
        <Col className="d-lg-none">
        <section className="form-container">
        <div className="form-cont table-responsive">
        <table className='table'>
        <thead>
          <tr>
              <th>Room</th>
            <th>Name</th>
            <th>CNIC Number</th>
            <th>Phone</th>
            <th>Price</th>
            <th>Total Capacity</th>
            <th>Remaining Capacity</th>
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
            </React.Fragment>
          ))}
          {booking.rooms.map((room, roomIndex) => (
            <React.Fragment key={roomIndex}>
              <td>{room.price}</td>
              <td>{room.capacity}</td>
              <td>{room.currentCapacity}</td>
            </React.Fragment>
          ))}
          <td>{booking.checkIn_date}</td>
          <td>{booking.checkOut_date}</td>
          </tr>
          ))}  
        </tbody>
        </table>
        </div>
        </section>
        </Col>
      </Row>  
    </Container>           
  </> 
  )
}
