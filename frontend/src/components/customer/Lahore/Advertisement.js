import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Lahore.css';
import {FaMapMarkerAlt,FaPhone,FaStar} from 'react-icons/fa';

const BackendUrl = 'http://localhost:8000';

const  Advertisement= () => {
  const [hostelData, setHostelData] = useState([]);
  const lahoreHostels = async () => {
    try {
      const res = await fetch('/hostelsInLahore', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (res.status === 200) {
        const data = await res.json();
        console.log(`hostels✌: ${data.hostels}`);
        console.log(`hostels✌: ${data}`);
        setHostelData(data.hostels);
       
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
      lahoreHostels();
  },[]);

  
  

  return (
    <div style={{paddingTop:'20px'}}>
     
      {hostelData.map((hostel, index) => (
        <>
        <div key={index} className='add_style'>
          <NavLink to={`/Hostel_ad/${hostel._id}`} key={hostel._id}className='hostelNameLink'>
          <Row>
            <Col>
            {hostel.hostelImages && hostel.hostelImages.length > 0 ? (
                  <img
                    src={`${BackendUrl}/${hostel.hostelImages[0]}`}
                    alt={`Image 1`}
                    className="img-fluid"
                    width="100%"
                    height="100%"
                  />
                ) : (
                  <img alt="" src='./images/242009851.jpg' width="100%" height="100%" />
                )}
            </Col>
            <Col>
            {/* <h2><NavLink to={`/HostelDetails/${hostel._id}`} key={hostel._id}className='hostelNameLink'>{hostel.name}</NavLink></h2> */}
              <h2><b>{hostel.name}</b></h2>
              {/* {Array.from({ length: item.stars }, (_, index) => (
                <FaStar key={index} className = 'star1' />
              ))} */}
              <Row style={{ paddingTop: "15px" }}>
                {/* {hostel.features.map((feature, index) => (
                  <Col xs key={index}>
                    <p style={{ border: '1px solid black', padding: "5px" }}>
                      <b>{feature}</b>
                    </p>
                  </Col>
                ))} */}
              </Row>
              <p style={{ textAlign: "left"}}>{hostel.description}</p>
              <p style={{ textAlign: "left"}}><FaMapMarkerAlt/>   {hostel.address}</p>
              <p style={{ textAlign: "left"}}><FaPhone/>   {hostel.phone}</p>
              {/* <p><b>{item.mapLink}</b></p> */}
            </Col>
          </Row>
          </NavLink>
        </div>
        <br></br>
      </>
      ))}  
    </div>
  );
};
export default Advertisement;