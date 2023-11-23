import React, { useState, useEffect} from 'react';
import { useRoomContext } from './RoomContext'; 
import { useParams } from 'react-router-dom';
import Navbar from '../manager/Navbar';
import { Link } from 'react-router-dom';
import './RoomDetail.css';

export default function RoomDetail() {
  const { roomId: contextRoomId, setRoomId } = useRoomContext();
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState({});

  const handleBookNowClick = () => {
    // Update the roomId using setRoomId from the context
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
      <Navbar option1="About Us" option2="Contact Us" option3="" />

      <section className="nameSec"></section>

      <section className="mainSec">
        <div className="container">
          <div className="image-container">
            <img src="/InHostel3.jpg" alt="My Image" className="rounded-image" />
          </div>

          <div >
            {roomData ? (
              <>
                <h2>Room Number: {roomData.roomNumber}</h2>
                <br/>
                <p>Room Type:{roomData.type}</p><br/>
                <p>Total Room Capacity: {roomData.capacity}</p><br/>
                <p>Remaining Room Capacity: {roomData.currentCapacity}</p><br/>
                <p>Room Price:{roomData.price}</p><br/>
                <p><strong>Facilities:</strong></p>
                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                       {roomData.facilities && Object.keys(roomData.facilities).length > 0 && Object.entries(roomData.facilities).map(([facility, value]) => (
                        value && <li key={facility}>{facility}</li>
                      ))}
                </ul>
                
              </>
            ) : (
              <p>Loading room details...</p>
            )}
          </div>
        </div>
        <Link to='/userSignupPage'>
      <button onClick={handleBookNowClick} className='button-link'>Book Now</button>
    </Link>
        {/* <Link to={`/BookingPage/${roomId}`}>
      <button className='button-link'>Book Now</button>
    </Link> */}
    
 
      </section>
    </>
  );
}
