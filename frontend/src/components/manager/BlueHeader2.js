import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './CustomerInfo.css'

export default function BlueHeader2() {

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
       //console.log(`name= ${data.name}`);
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

    fetchManagerData();
    fetchBookingDetails();
  }, [hostelId]);
  const [sidenavWidth, setSidenavWidth] = useState(0);

  const openNav = () => {
    setSidenavWidth(250);
  };

  const closeNav = () => {
    setSidenavWidth(0);
  };

const background_style={
  height: "40px"
};
  return (
    <div>
      <header style={background_style} className='header_cont'>
      <div style={{ width: sidenavWidth }} className="sidenav">
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
          &times;
        </a>
        <h2>{userData && <h2>{userData.name}</h2>}</h2>
        <a href="/hostelsPage">Home</a>
        <a href={`/RoomStatus/${hostelId}`}>Rooms</a>
        <a href={`/CustomerInfo/${hostelId}`}>Customer</a>
        <a href="#">Notification</a>
        <a href="#">Messages</a>
        <a href="#">Logout</a>
      </div>

      <div id="main">
        <span className="d-lg-none" style={{ fontSize: '30px', cursor: 'pointer' }} onClick={openNav}>
          &#9776;
        </span>
      </div>
      </header>
    </div>
  )
}
