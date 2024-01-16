import React from 'react';
import Slider from 'react-slick';
import CardComponent from './CardComponent';
import { useEffect } from 'react'
import {useState} from 'react';
import {FaMapMarkerAlt,FaPhone,FaStar} from 'react-icons/fa';

const BackendUrl = 'http://localhost:8000';

const Popular = ({city}) => {
  const [hostelData, setHostelData] = useState([]);
  const fetchPopularHostels = async (city) => {
    try {
      const res = await fetch('/popularHostels', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      console.log('Response status:', res.status);

      if (res.status === 200) {
        const data = await res.json();
        console.log(`hostels✌: ${data.hostels}`);
        console.log(`hostels✌: ${data}`);
        setHostelData(data.hostels);
      } else {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPopularHostels(city);
  },[]);

  const getHostelImage = (hostel) => {
    return hostel.hostelImages.length > 0
      ? `${BackendUrl}/${hostel.hostelImages[0]}`
      : "/images/242009851.jpg";
  };
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

  const filteredHostels = hostelData.filter(hostel => hostel.city === city);

  return (
    <>
    <div className='form-containerpop'>
      <h1 style={h_style}><b>Popular Hostels in {city}</b></h1>
        <Slider {...settings}> 
          {filteredHostels.map((hostel, index) => (
            <div key={index}>
              <CardComponent title={hostel.name} content={hostel.address}  image={getHostelImage(hostel)} hostelId={hostel._id} />
            </div>
          ))}
        </Slider>
      </div>
      
    </>
  );
};

export default Popular;
