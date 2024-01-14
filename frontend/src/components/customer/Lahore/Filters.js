import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import './Filters.css';

const ResponsiveDropdowns = ({ onGenderSelect, onFacilitiesSelect }) => {
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedFacilities, setSelectedFacilities] = useState('');

  const genders = ['Male', 'Female'];
  const facilities = ['parking', 'wifi', 'laundry', 'Elevator', 'mess', 'livingArea'];

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    onGenderSelect(gender);
  };

  const handleFacilitiesSelect = (facility) => {
    setSelectedFacilities(facility);
    onFacilitiesSelect(facility);
  };

  return (
    <div className="horizontal-dropdowns">
      {/* Gender */}
      <Dropdown className="mb-3">
        <Dropdown.Toggle variant="secondary" style={{ backgroundColor: 'white', color: 'black' }}>
          {selectedGender || 'Gender'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleGenderSelect('')}>All</Dropdown.Item>
          {genders.map((gender) => (
            <Dropdown.Item key={gender} onClick={() => handleGenderSelect(gender)}>
              {gender}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* Facilities */}
       
       <Dropdown className="mb-3">
        <Dropdown.Toggle variant="secondary" style={{ backgroundColor: 'white', color: 'black' }}>
          {selectedFacilities || 'Facilities'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleFacilitiesSelect('')}>All</Dropdown.Item>
          {facilities.map((facility) => (
            <Dropdown.Item key={facility} onClick={() => handleFacilitiesSelect(facility)}>
              {facility}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ResponsiveDropdowns;
