import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../manager/Navbar';
import { NavLink } from 'react-router-dom';
import Filters from './Lahore/Filters';
import './AllHostels.css';

const BackendUrl = 'http://localhost:8000';
export default function HostelsDisplay() {

    const [hostels, setHostels] = useState([]);
    const [selectedCity, setSelectedCity] = useState(''); // Add state to manage selected city
    const [selectedGender, setSelectedGender] = useState('');
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
  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };



  // Filter 
  const filteredHostels = hostels.filter((hostel) => {
    const cityFilter = selectedCity === '' || hostel.city === selectedCity;
    const genderFilter = selectedGender === '' || hostel.customersGender === selectedGender;
    return cityFilter && genderFilter;
  });

  return (
    <>
      <Navbar option1="About Us" option2="Contact Us" option3="" />

      <section className="nameSec"></section>
      
      <section className="mainSec">
      <Filters
          onCitySelect={handleCitySelect}
          onGenderSelect={handleGenderSelect}
        />                                  {/* Pass the callback to update selected city */}      <h1 style={{ color: 'black' }}>Hostels</h1>
      <div className="room-selector">
      {filteredHostels.map((hostel) => (
            <NavLink to={`/HostelDetails/${hostel._id}`} className='hostelNameLink'>
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
