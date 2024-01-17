import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Filters from './Lahore/Filters';
import './AllHostels.css';
import { Container } from 'react-bootstrap';

const BackendUrl = 'http://localhost:8000';

export default function HostelsDisplay() {
  const [hostels, setHostels] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedFacilities, setSelectedFacilities] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  const GetHostels = async () => {
    try {
      const response = await fetch('/getAllHostels', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.status === 200) {
        const data = await response.json();
        setHostels(data.hostels);
      } else {
        throw new Error('Failed to fetch hostels');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  useEffect(() => {
    GetHostels();
  }, [selectedRating]);

  const filterHostelByRating = (hostel, selectedRating) => {
    if (!selectedRating) {
      return true;
    }

    const hostelRating = hostel.averageRating || 0;

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
        return true;
    }
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleFacilitiesSelect = (facility) => {
    setSelectedFacilities(facility);
  };

  const handleRatingFilterSelect = (ratingFilter) => {
    setSelectedRating(ratingFilter);
  };

  const filteredHostels = hostels.filter((hostel) => {
    const genderFilter = selectedGender === '' || hostel.customersGender === selectedGender;
    const facilitiesFilter =
      selectedFacilities === '' || hostel.facilities[selectedFacilities] === true;
    const ratingFilter = filterHostelByRating(hostel, selectedRating);

    return genderFilter && facilitiesFilter && ratingFilter;
  });

  return (
    <>
      <Navbar/>
      <Container fluid className ='form-container' >
        <Filters
          onGenderSelect={handleGenderSelect}
          onFacilitiesSelect={handleFacilitiesSelect}
          onRatingFilterSelect={handleRatingFilterSelect}
        />
        <div className="room-selector">
          {filteredHostels.map((hostel) => (
            <NavLink to={`/Hostel_ad/${hostel._id}`} className="hostelNameLink" key={hostel._id}>
              <div className="roomDisplay">
                <div>
                  {hostel.hostelImages && hostel.hostelImages.length > 0 ? (
                    <img
                      src={`${BackendUrl}/${hostel.hostelImages[0]}`}
                      alt={`Image 1`}
                      style={{ width: '60%', height: '60%' }}
                    />
                  ) : (
                    <img alt="" src="./images/242009851.jpg" width="60%" height="60%" />
                  )}
                  <p>Hostel Name. {hostel.name}</p>
                  <p>Address. {hostel.address}</p>
                  <p>Contact No: {hostel.phone}</p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
        </Container>
    </>
  );
}
