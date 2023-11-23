import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import './Filters.css';

const ResponsiveDropdowns = ({ onCitySelect,onGenderSelect }) => { // Pass a callback to update the selected city
  const [selectedCity, setSelectedCity] = useState(''); // Add state to manage selected city
  const [selectedGender, setSelectedGender] = useState('');

  const cities = ['Lahore', 'Karachi', 'Islamabad', 'Faislabad'];
const genders = ['Male', 'Female'];

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    onCitySelect(city); // Call the callback to update the selected city in the parent component
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    onGenderSelect(gender);
  };


  return (
    <div className="horizontal-dropdowns">
      <Dropdown className="mb-3">
        <Dropdown.Toggle variant="secondary" style={{ backgroundColor: 'white', color: 'black' }}>
          {selectedCity || 'City'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleCitySelect('')}>All Cities</Dropdown.Item>
          {cities.map((city) => (
            <Dropdown.Item
              key={city}
              onClick={() => handleCitySelect(city)}
            >
              {city}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      

      {/* Gender */}
      <Dropdown className="mb-3">
        <Dropdown.Toggle variant="secondary" style={{ backgroundColor: 'white', color: 'black' }}>
          {selectedGender || 'Gender'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleGenderSelect('')}>All </Dropdown.Item>
          {genders.map((gender) => (
            <Dropdown.Item
              key={gender}
              onClick={() => handleGenderSelect(gender)}
            >
              {gender}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      
    </div>
  );
};

export default ResponsiveDropdowns;
