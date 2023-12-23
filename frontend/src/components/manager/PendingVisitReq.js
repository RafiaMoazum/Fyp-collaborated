import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from '../customer/Navbar/Navbar'
import BlueHeader2 from './BlueHeader2'
import './CustomerInfo.css'
import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function PendingVisitReq() {
  const { hostelId } = useParams();
  const[userData, setUserData]=useState({ name: 'Manager' });
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

       setUserData(data);
       
       

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


  const handleAllow = (bookingId) => {
    window.alert(`Visit Booking Request sent successfully: ${bookingId}`)
    console.log(`Visit Booking Request sent successfully: ${bookingId}`);
  };
	 
  const handleReject = (bookingId) => {
    window.alert(`Reject clicked for bookingId: ${bookingId}`)
    console.log(`Reject clicked for bookingId: ${bookingId}`);
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
                <li>{userData && <h2>{userData.name}</h2>}</li>                  <li><Link to="/hostelsPage" style={{textDecoration: "none", color: "white"}} >Home</Link></li>
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
                  <th>Name</th>
                  <th>CNIC Number</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {bookingDetails.map((book) => (
                  <tr key={book._id}>
                    <td>{book.name}</td>
                    <td>{book.cnic}</td>
                    <td>{book.phone}</td>
                    <td>{book.email}</td>
                    <td>{book.date}</td>
                    <td>
                      <button
                        onClick={() => handleAllow(book._id)}
                        style={{ backgroundColor: 'green', color: 'white' }}
                      >
                        Allow
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleReject(book._id)}
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
    </>
  )
}
