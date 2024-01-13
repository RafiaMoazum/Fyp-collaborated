import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const BackendUrl = 'http://localhost:8000';

const Advertisement = ({ city, hostels, selectedGender, selectedFacilities }) => {
  const [hostelData, setHostelData] = useState([]);

  useEffect(() => {
    const filteredHostels = hostels.filter(
      (hostel) =>
        (!selectedGender || hostel.customersGender === selectedGender) &&
        (!city || hostel.city === city) &&
        (!selectedFacilities || hostel.facilities[selectedFacilities] === true)
    );
    setHostelData(filteredHostels);
  }, [selectedGender, hostels, city, selectedFacilities]);

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
  };

  return (
    <div style={{ paddingTop: '20px' }}>
      {hostelData.map((hostel, index) => (
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
                  <img alt='' src='./images/242009851.jpg' width='100%' height='100%' />
                )}
              </Col>
              <Col>
                <h2><b>{hostel.name}</b></h2>
                <Row style={{ paddingTop: '15px' }}></Row>
                <p style={{ textAlign: 'left' }}>{truncateDescription(hostel.description, 15)}</p>
                <p style={{ textAlign: 'left' }}>
                  <FaMapMarkerAlt /> {hostel.address}
                </p>
                <p style={{ textAlign: 'left' }}>
                  <FaPhone /> {hostel.phone}
                </p>
              </Col>
            </Row>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default Advertisement;
