import React, { useState } from 'react';
import { Container, Dropdown } from 'react-bootstrap';
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
    
    <Container fluid style={{paddingLeft:"0px", paddingRight: "0px"}}>
    <div className="horizontal-dropdowns">
      {/* Gender */}
      <Dropdown className="mb-3">
        <Dropdown.Toggle variant="secondary" style={{ backgroundColor: '#3C6B97', color: 'white' }}>
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
        <Dropdown.Toggle variant="secondary" style={{ backgroundColor: '#3C6B97', color: 'white' }}>
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
        <Dropdown.Toggle variant="secondary" style={{ backgroundColor: '#3C6B97', color: 'white' }}>
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
    </Container>
  );
};

export default ResponsiveDropdowns;
