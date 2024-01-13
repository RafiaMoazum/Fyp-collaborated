import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Lahore.css';
import {FaMapMarkerAlt,FaPhone,FaStar} from 'react-icons/fa';

const BackendUrl = 'http://localhost:8000';

const  Advertisement= ({city}) => {
  const [hostelData, setHostelData] = useState([]);
  const allHostels = async () => {
    try {
      const res = await fetch('/allHostels', {
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

          // Filter hostels based on the city
          const filteredHostels = data.hostels.filter((hostel) => hostel.city === city);
          setHostelData(filteredHostels);       
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
      allHostels();
  },[]);

  
  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
  };

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
            <h2><b>{hostel.name}</b></h2>
              <Row style={{ paddingTop: "15px" }}>
              </Row>
              <p style={{ textAlign: "left" }}>{truncateDescription(hostel.description, 15)}</p>
              <p style={{ textAlign: "left"}}><FaMapMarkerAlt/>   {hostel.address}</p>
              <p style={{ textAlign: "left"}}><FaPhone/>   {hostel.phone}</p>
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