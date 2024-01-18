import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export default function Bookings() {
  const { userId } = useParams();
  const [pendingBookings, setPendingBookings] = useState([]);
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [userData, setUserData] = useState({ name: '' });

  const fetchUserData = async () => {
    try {
      const res = await fetch('/userData', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();
      setUserData(data);

      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserBookings = async () => {
    try {
      // Fetch pending bookings
      const pendingRes = await fetch(`/userBookings/${userId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const pendingData = await pendingRes.json();
      setPendingBookings(pendingData);

      // Fetch confirmed bookings
      const confirmedRes = await fetch(`/showConfirmedBookings/${userId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const confirmedData = await confirmedRes.json();
      setConfirmedBookings(confirmedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchUserBookings();
  }, [userId]);

  return (
    <>
      <Navbar />
      <Container fluid>
        <Row>
          <Col xs={4} sm={4} md={2} lg={2} className="d-none d-lg-block">
            <div>
              <div className="side">
                <nav>
                  <ul>
                    {userData && <h2>{userData.name}</h2>}
                    <li>
                      <Link
                        to=""
                        style={{ textDecoration: 'none', color: 'black' }}
                      ></Link>
                    </li>
                    <div style={{ border: '1px solid black', margin: '10px 0' }}></div>
                    <li>
                      {' '}
                      <Link to={`/updateCustomerProfile/${userId}`} style={{ textDecoration: 'none', color: 'black' }}>Profile</Link>
                    </li>
                    <div style={{ border: '1px solid black', margin: '10px 0' }}></div>
                  </ul>
                </nav>
              </div>
            </div>
          </Col>

          <Col xs={8} sm={8} md={10} lg={10} className="d-none d-lg-block">
            <section className="form-container">
              <div className="form-cont table-responsive">
                <h1 style={{color: 'red' }}>Pending Bookings</h1>
                <table className="table">
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Room</th>
                      <th>Price</th>
                      <th>Check In date</th>
                      <th>Check Out date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingBookings.map((booking) => (
                      <tr key={booking._id}>
                        <td>{booking.users[0].name}</td>
                        <td>{booking.rooms[0].roomNumber}</td>
                        <td>{booking.rooms[0].price}</td>
                        <td>{booking.checkIn_date}</td>
                        <td>{booking.checkOut_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h1 style={{color: 'green' }}>Confirmed Bookings</h1>
                <table className="table">
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Room</th>
                      <th>Price</th>
                      <th>Check In date</th>
                      <th>Check Out date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {confirmedBookings && confirmedBookings.bookings && confirmedBookings.bookings.map((booking) => (
                      <tr key={booking.bookingId}>
                        <td>{booking.users[0].name}</td>
                        <td>{booking.rooms[0].roomNumber}</td>
                        <td>{booking.rooms[0].price}</td>
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
  );
}
