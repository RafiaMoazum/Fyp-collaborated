import React from 'react'
import {useState, useEffect} from 'react';
import BlueHeader from '../manager/BlueHeader'
import Navbar from '../manager/Navbar'
import './HostelDetails.css'
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Reviews from './Reviews/Reviews';
import ReviewForm from './Reviews/ReviewForm';

export default function HostelDetails() {
  const{hostelId}= useParams();
  const [hostelData, setHostelData] = useState([]);

  const HostelDetails = async () => {
    try {
      const res = await fetch(`/hostelDetails/${hostelId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (res.status === 200) {
        const data = await res.json();
        console.log(`hostelsProfile✌: ${data}`);
        setHostelData(data);
       
      }else {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.error(err);
      //navigate('/loginPage');
    }
  };
  useEffect(() =>{
    HostelDetails();
},[]);
  return (
    <>
     <Navbar option1={"About Us"} option2={"Contact Us"} option3= {""}/>
    {/* <BlueHeader/> */}
    <section className="nameSec">
        
    </section>
    {/* <SideMenu  opt1={"Home"} link1={"/HostelsPage"} opt2={"Hostel Profile"} link2={`/HostelProfile/${hostelId}`} opt3={"Room Status"} link3={`/RoomStatus/${hostelId}`} opt4={"Customer Info"} link4={"/CustomerInfo"}/> */}


    <section className="mainSec">
    <div className="container">
    <div className="image-container">
      <img src="/hostel1.png" alt="My Image" className="rounded-image" />
    </div>

    <div className="content-container">
       
        <h2>{hostelData.name}</h2>
        <p>{hostelData.city}</p>
        <br></br>
        {/* <p className="left">City</p> */}
        
      </div>
    </div>

    <div className="image-row">
      <div className="image-container2">
        <img src="/InHostel1.jpg" alt="Image 1" />
        
      </div>
      <div className="image-container2">
        <img src="/InHostel2.jpg" alt="Image 2" />
        
      </div>
      <div className="image-container2">
        <img src="/InHostel3.jpg" alt="Image 3" />
        
      </div>
    </div>

    <div className="text-container">
      <p>{hostelData.description}</p>
    </div>
    <div className="text-container">
      <p>For:{hostelData.customersGender}</p>
    </div>
    
    
    <div className="image-container3">
        <img src="/images/address.png" alt="Image 1" />
        <p>{hostelData.address}</p>
      </div>
      <div className="image-container3">
        <img src="/contact.png" alt="Image 2" />
        <p>{hostelData.phone}</p>
      </div>
      <div className="image-container3">
        <img src="/email.png" alt="Image 3" />
        <p>{hostelData.email}</p>
      </div>
      <Link to={`/RoomsDisplay/${hostelId}`}>
      <button className='button-link'>See Rooms</button>
    </Link>
    <br/>
    <br/>
    
    <Reviews/>
    <br/>
    <br/>
    <ReviewForm/>
   

    </section>
    </>

    
  )
}
