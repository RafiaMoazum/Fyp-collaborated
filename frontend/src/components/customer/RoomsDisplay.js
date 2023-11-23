import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../manager/Navbar';
import { NavLink } from 'react-router-dom';
import './RoomsDisplay.css';

export default function RoomsDisplay() {
  const { hostelId } = useParams();
  const [displayrooms, setDisplayRooms] = useState([]);

  const DisplayRoomData = async () => {
    try {
      const res = await fetch(`/showRooms/${hostelId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      console.log('Response:', res);

      if (res.status === 200) {
        const data = await res.json();
        console.log(`Room✌: ${data}`);
        setDisplayRooms(data);
      } else {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    DisplayRoomData();
  }, []);

  return (
    <>
      <Navbar option1="About Us" option2="Contact Us" option3="" />

      <section className="nameSec"></section>
      
      <section className="mainSec">
      <h1 style={{ color: 'black' }}>Rooms</h1>


        <div className="room-selector">
          {displayrooms.map((room) => (
            <NavLink to={`/RoomDetail/${room._id}`} className='hostelNameLink'>
            <div key={room._id} className="roomDisplay">
              <div>
                <p>Room No. {room.roomNumber}</p>
                <p>Room Type. {room.type}</p>
                <p>Total Capacity. {room.capacity}</p>
                <p>Current Capacity. {room.currentCapacity}</p>
                <p>Price. {room.price}</p>
               
              </div>
            </div>
            </NavLink>
          ))}
        </div>
      </section>
      
    </>
  );
}
