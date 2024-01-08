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
    <div>
      <Row>
        <Col xs={4} sm={4} md={2} lg={2}>
          <div>
            <div className='side'>
              <nav>
                <ul>
                  <li>{userData && <h2>{userData.name}</h2>}</li>
                  <li><Link to="/hostelsPage" style={{textDecoration: "none", color: "white"}} >Home</Link></li>
                  <div style={{ border: "1px solid white", margin: "10px 0" }}></div>
                  <li><Link to={`/RoomStatus/${hostelId}`} style={{textDecoration: "none", color: "white"}} >Rooms</Link></li>
                  <div style={{ border: "1px solid white", margin: "10px 0" }}></div>
                  <li><Link to={`/CustomerInfo/${hostelId}`} style={{textDecoration: "none", color: "white"}} >Customer Information</Link></li>
                  <div style={{ border: "1px solid white", margin: "10px 0" }}></div>
                  <li><Link to="" style={{textDecoration: "none", color: "white"}} >Notification</Link> </li>
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

        </section>

        </Col>
      </Row>  
    </div>             
    </>
  )
}
