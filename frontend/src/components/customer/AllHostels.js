import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../manager/Navbar';
import { NavLink } from 'react-router-dom';
import Filters from './Lahore/Filters';
import './AllHostels.css';

const BackendUrl = 'http://localhost:8000';
export default function HostelsDisplay() {

    const [hostels, setHostels] = useState([]);
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedFacilities, setSelectedFacilities] = useState('');

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
            //console.log(`data.hostels == ${JSON.stringify(data.hostels)}`);

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
      }, []);


      
  // Function to update the selected city when it changes in Filters component
 
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleFacilitiesSelect = (facility) => {
    setSelectedFacilities(facility);
  };
  

  // Filter 
  const filteredHostels = hostels.filter((hostel) => {
    const genderFilter = selectedGender === '' || hostel.customersGender === selectedGender;
    const facilitiesFilter =
      selectedFacilities === '' || hostel.facilities[selectedFacilities] === true;
    return genderFilter && facilitiesFilter;
  });

  return (
    <>
      <Navbar option1="About Us" option2="Contact Us" option3="" />

      <section className="nameSec"></section>
      
      <section className="mainSec">
      <Filters
          onGenderSelect={handleGenderSelect}
          onFacilitiesSelect={handleFacilitiesSelect}

        />                                   
          <h1 style={{ color: 'black' }}>Hostels</h1>
      <div className="room-selector">
      {filteredHostels.map((hostel) => (
            <NavLink to={`/Hostel_ad/${hostel._id}`} className='hostelNameLink'>
            <div className="roomDisplay">
            <div>
              {hostel.hostelImages && hostel.hostelImages.length > 0 ? (
                <img
                  src={`${BackendUrl}/${hostel.hostelImages[0]}`}
                  alt={`Image 1`}
                  style={{ width: '60%', height: '60%' }}
                />
              ) : (
                <img alt="" src='./images/242009851.jpg' width="60%" height="60%" />
              )}
              <p>Hostel Name. {hostel.name}</p>
              <p>Address. {hostel.address}</p>
              <p>Contact No: {hostel.phone}</p>
              
            </div>
          </div>
            </NavLink>
          ))}
        </div>

       
      </section>
      
    </>
  );
}
