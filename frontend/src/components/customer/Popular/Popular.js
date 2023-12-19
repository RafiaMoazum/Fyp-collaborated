import React from 'react';
import Slider from 'react-slick';
import CardComponent from './CardComponent';
import { useEffect } from 'react'
import {useState} from 'react';
import {FaMapMarkerAlt,FaPhone,FaStar} from 'react-icons/fa';

const Popular = () => {
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

  const cardData = [
    { title: 'Hostel Name 1', content: 'price/-  per night\naddress' },
    { title: 'Hostel Name 2', content: 'price/-  per night\naddress' },
    { title: 'Hostel Name 3', content: 'price/-  per night\naddress' },
    { title: 'Hostel Name 4', content: 'price/-  per night\naddress' },
    { title: 'Hostel Name 5', content: 'price/-  per night\naddress' },
    // ... Repeat for other card data
  ];
  const h_style =
  {
      color: "Black",
      backgroundColor: "white",
      padding: "50px",
      fontFamily: "Sans-Serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const hostelInfo =
  {
      color: "Black",
      border:"2px solid black",
      
  };

  return (
    <>
      <h1 style={h_style}><b>Popular Hostels in Lahore</b></h1>
      <Slider {...settings}> 
        {hostelData.map((hostel, index) => (
          <div key={index}>
            <CardComponent title={hostel.name} content={hostel.address}/>
          </div>
        ))}
        {cardData.map((card, index) => (
          <div key={index}>
            <CardComponent title={card.title} content={card.content} />
          </div>
        ))}
       
       </Slider>
       {/* {hostelData.map((hostel, index) => (
          <div key={index} style={hostelInfo}>
            <h2>{hostel.name}</h2> 
            <p>Address:{hostel.address}</p>
            <p>Contact:{hostel.phone}</p>
            <p>City:{hostel.city}</p>
            <p>Description:{hostel.description}</p>
          </div>
        ))} */}
    </>
  );
};

export default Popular;
