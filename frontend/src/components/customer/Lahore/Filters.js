import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import './Filters.css';

const ResponsiveDropdowns = ({ onGenderSelect, onFacilitiesSelect,onRatingFilterSelect }) => {
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedFacilities, setSelectedFacilities] = useState('');
  const [selectedRatingFilter, setSelectedRatingFilter] = useState('');
 

  const genders = ['Male', 'Female'];
  const facilities = ['parking', 'wifi', 'laundry', 'Elevator', 'mess', 'livingArea'];
  const ratingFilters = ['5', '4+', '3+', '2+', '1+'];

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    onGenderSelect(gender);
  };

  const handleFacilitiesSelect = (facility) => {
    setSelectedFacilities(facility);
    onFacilitiesSelect(facility);
  };

  const handleRatingFilterSelect = (ratingFilter) => {
    setSelectedRatingFilter(ratingFilter);
    onRatingFilterSelect(ratingFilter);
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

       {/* Rating Filter */}
       <Dropdown className="mb-3">
        <Dropdown.Toggle variant="secondary" style={{ backgroundColor: 'white', color: 'black' }}>
          {selectedRatingFilter || 'Rating'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {ratingFilters.map((filter) => (
            <Dropdown.Item key={filter} onClick={() => handleRatingFilterSelect(filter)}>
              {filter}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ResponsiveDropdowns;
