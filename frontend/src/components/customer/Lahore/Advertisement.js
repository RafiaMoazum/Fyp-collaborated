import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {  FaMapMarkerAlt, FaPhone,FaStar,FaMale} from 'react-icons/fa';

const BackendUrl = 'http://localhost:8000';

const Advertisement = ({ city, hostels, selectedGender, selectedFacilities,selectedRating }) => {
  const [hostelData, setHostelData] = useState([]);

  useEffect(() => {
    const filteredHostels = hostels.filter(
      (hostel) =>
        (!selectedGender || hostel.customersGender === selectedGender) &&
        (!city || hostel.city === city) &&
        (!selectedFacilities || hostel.facilities[selectedFacilities] === true) &&
        filterHostelByRating(hostel, selectedRating)
    );
    setHostelData(filteredHostels);
  }, [selectedGender, hostels, city, selectedFacilities,selectedRating]);

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
  };

  // Function to filter hostels by rating
  const filterHostelByRating = (hostel, selectedRating) => {
    if (!selectedRating) {
      return true; // No rating filter selected, so hostel passes the filter
    }

    const hostelRating = hostel.averageRating || 0;

    // Compare the hostel's rating based on the selected rating filter
    switch (selectedRating) {
      case '5':
        return hostelRating === 5;
      case '4+':
        return hostelRating >= 4;
      case '3+':
        return hostelRating >= 3;
      case '2+':
        return hostelRating >= 2;
      case '1+':
        return hostelRating >= 1;
      default:
        return true; // Default case, no rating filter selected
    }
  };

  return (
    <>
    <Container fluid style={{paddingLeft:"0px", paddingRight:"0px"}}>
    <div style={{ paddingTop: '20px' }}>
      {hostelData.map((hostel, index) => (
        <>
        <div key={index} className='add_style'>
          <NavLink to={`/Hostel_ad/${hostel._id}`} key={hostel._id} className='hostelNameLink'>
            <Row>
              <Col>
                {hostel.hostelImages && hostel.hostelImages.length > 0 ? (
                  <img
                    src={`${BackendUrl}/${hostel.hostelImages[0]}`}
                    alt={`Image 1`}
                    className='img-fluid'
                    width='100%'
                    height='100%'
                  />
                ) : (
                  <img alt='' src='/no_img.jpg' width='100%' height='100%' />
                )}
              </Col>
              <Col>
                <h2><b>{hostel.name}</b></h2>
                <Row style={{ paddingTop: '15px' }}></Row>
                <p style={{ textAlign: 'right' }}>
                  
                  <FaStar style={{ color: ' #FFD600' }}/> {hostel.averageRating}
                                   
                </p>

                <p style={{ textAlign: 'left' }}>{truncateDescription(hostel.description, 15)}</p>
                <p style={{ textAlign: 'left' }}>
                  <FaMapMarkerAlt /> {hostel.address}
                </p>
                <p style={{ textAlign: 'left' }}>
                  <FaPhone /> {hostel.phone}
                </p>
                <p style={{ textAlign: 'left' }}>
                  <FaMale /> {hostel.customersGender}
                </p>
               
              </Col>
            </Row>
          </NavLink>
        </div>
        <br></br>
        </>
      ))}
    </div>
    </Container>
    </>
  );
};

export default Advertisement;
