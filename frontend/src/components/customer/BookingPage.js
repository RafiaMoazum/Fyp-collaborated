import React from 'react'
import BookingForm from './BookingForm';
import './BookingPage.css';
import Navbar from '../manager/Navbar';


export default function BookingPage() {
    const headingStyle = {
        color: 'white',
        textAlign: 'center'
      };
      const sectionStyle = {
        height:'450px'
      };
      return (
        <>
       <Navbar option1={"Home"} link1={"/"} option2={"Login"} link2={"/loginPage"}option3= {"Contact Us"} link3={"/contactUs"}/> 
       
        <div className="outer">
        <img src="/images/SignUPimg.png" alt="img" width="1400" height="550"></img> 
        <div className="text">
          <h1 style={headingStyle}>Book Now!</h1>

          <BookingForm/>
          </div>
        </div>
        <section style={sectionStyle}>
             
        </section> 
        
        </>
      )
}

 
