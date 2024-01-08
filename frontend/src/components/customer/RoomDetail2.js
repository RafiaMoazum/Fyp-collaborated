import React, { useState, useEffect} from 'react';
import { useRoomContext } from './RoomContext'; 
import { useParams } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import BlueHeader2 from '../manager/BlueHeader2';
import { Link } from 'react-router-dom';
import ImageSlider2 from './Hostel_ad/ImageSlider2';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/Container';
import BookingForm from './BookingForm';
import './RoomDetail.css';
import { FaCheck } from 'react-icons/fa';

export default function RoomDetail2() {
  
  
  const images = [
    '/roompic.jpg',
        '/roompic.jpg',
        '/roompic.jpg',
        '/roompic.jpg',
  ];

  const [isDivVisible, setDivVisible] = useState(false);
  const { roomId: contextRoomId, setRoomId } = useRoomContext();
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState({});

  const handleBookNowClick = () => {
    // Update the roomId using setRoomId from the context
    {
      setDivVisible(!isDivVisible);
    };
    setRoomId(roomId);
  };

  useEffect(() => {
    const GetRoomDetail = async () => {
      try {
        const res = await fetch(`/roomDetails/${roomId}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (res.status === 200) {
          const data = await res.json();
          console.log(`roomDetail✌: ${data}`);
          setRoomData(data);
        } else {
          const error = new Error(res.error);
          throw error;
        }
      } catch (err) {
        console.error(err);
        // navigate('/loginPage');
      }
    };
    
    GetRoomDetail();
  }, [roomId]);

  return (
    <>
      <Navbar/>
      <BlueHeader2/>
      <section>
        <div className="container">
          <div>
                <Container>
                    <Row>
                    <Col xs={0} sm={1} md={1} lg={1}>
                        
                    </Col>
                    <Col xs={6} sm={6} md={7} lg={8}>
                    <ImageSlider2 images={roomData.roomImages} />
                    </Col>
                    <Col xs={6} sm={5} md={4} lg={3}>
                    <div style = {{textAlign: "left"}} >
                      {roomData ? (
                        <>
                          {/* <h2>Room Number: {roomData.roomNumber}</h2> */}
                          <br/>
                          <p><b>Room Type : </b>{roomData.type}</p>
                          {/*<p><b>Total Room Capacity : </b> {roomData.capacity}</p>*/}
                          <p><b>Occupancy : </b> {roomData.currentCapacity}</p>
                          <p><b>Room Price : </b>{roomData.price}</p>
                          <p><b>Amenties : </b></p>
                          <ul style={{ listStyleType: 'none', paddingLeft : "0px"}}>
                                {roomData.facilities && Object.keys(roomData.facilities).length > 
                                0 && Object.entries(roomData.facilities).map(([facility, value]) => (
                                  value && <li key={facility}> <FaCheck/> {facility} </li> 
                                ))}
                          </ul>
                          <Link to=''>
                            <button onClick={handleBookNowClick} className='btn_link'>Book Now</button>
                          </Link>
                        </>
                      ) : (
                        <p>Loading room details....</p>
                      )}
                      <div>
                        {isDivVisible && (
                            <div>
                              <BookingForm/>
                            </div>
                        )}
                    </div>
                    </div>
                    </Col>
                    </Row>
                </Container>
            </div>
            </div>
          </section>
    </>
  );
}
