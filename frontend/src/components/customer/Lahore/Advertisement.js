import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Lahore.css';


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

  // const divArray = [
  //   {
  //     imgSrc: './images/242009851.jpg',
  //     hotelName: 'Hotel Name 1',
  //     stars: 3,
  //     features: ['Double bed', 'Free internet', '+4'],
  //     price: 'Rs. 1000/- per night',
  //     address: 'Address 1, Lahore',
  //     mapLink: 'Link to Map 1'
  //   },
  //   {
  //     imgSrc: './images/242009851.jpg',
  //     hotelName: 'Hotel Name 2',
  //     stars: 4,
  //     features: ['Double bed', 'Free internet', '+6'],
  //     price: 'Rs. 1500/- per night',
  //     address: 'Address 2, Lahore',
  //     mapLink: 'Link to Map 2'
  //   },
  //   {
  //     imgSrc: './images/242009851.jpg',
  //     hotelName: 'Hotel Name 2',
  //     stars: 4,
  //     features: ['Double bed', 'Free internet', '+6'],
  //     price: 'Rs. 1500/- per night',
  //     address: 'Address 2, Lahore',
  //     mapLink: 'Link to Map 2'
  //   },
  //   {
  //     imgSrc: './images/242009851.jpg',
  //     hotelName: 'Hotel Name 2',
  //     stars: 4,
  //     features: ['Double bed', 'Free internet', '+6'],
  //     price: 'Rs. 1500/- per night',
  //     address: 'Address 2, Lahore',
  //     mapLink: 'Link to Map 2'
  //   },
  // ];

  return (
    <div style={{paddingTop:'20px'}}>
      {/* <Link to={`/HostelProfile/${hostelData._id}`} style={{textDecoration:'none', color:'black'}}> */}
     
      {/* {divArray.map((item, index) => ( */}
      {hostelData.map((hostel, index) => (
        <>
        <div key={index} className='add_style'>
          <NavLink to={`/HostelDetails/${hostel._id}`} key={hostel._id}className='hostelNameLink'>
          <Row>
            <Col>
              <img alt="" src='./images/242009851.jpg' width="100%" height="100%" />
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
              <p><b>{hostel.description}</b></p>
              <p><b>{hostel.address}</b></p>
              <p><b>{hostel.phone}</b></p>
              <p><b>{hostel.email}</b></p>
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