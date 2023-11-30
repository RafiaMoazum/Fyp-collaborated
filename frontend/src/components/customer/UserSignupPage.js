

import React from 'react'
import UserSignupForm from './UserSignupForm';
import './UserSignupPage.css';
import Navbar from './Navbar/Navbar';
import { useRoomContext } from './RoomContext';
//import BlueHeader from './BlueHeader';


export default function SignupPage() {
    const headingStyle = {
        color: 'white',
        textAlign: 'left'
      };
      const sectionStyle = {
        height:'450px'
      };
      return (
        <>
       {/* <Navbar option1={"Home"} link1={"/"} option2={"Login"} link2={"/loginPage"}option3= {"Contact Us"} link3={"/contactUs"}/>  */}
       <Navbar/>
       {/* <BlueHeader/> */}
        <div className="outer">
        <img src="./images/SignUPimg.png" alt="img" width="1400" height="550"></img> 
        <div className="text">
          {/* <h1 style={headingStyle}>Welcome on Becoming a member</h1>
          <h1 style={headingStyle}> of our Hostel family</h1> */}
          <UserSignupForm/>
          </div>
        </div>
        <section style={sectionStyle}>
             
        </section> 
        
        </>
      )
}

 
