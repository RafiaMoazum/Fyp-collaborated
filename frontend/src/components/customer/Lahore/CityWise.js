import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Popular from "../Popular/Popular";
import Advertisement from './Advertisement';
import Filters from './Filters';
import Paginations from './Paginations';
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import './Lahore.css';
import {useNavigate, useLocation } from 'react-router-dom';
import { useState,useEffect} from 'react';

// Function to filter hostels by rating
const filterHostelByRating = (hostel, selectedRatingFilter) => {
  if (!selectedRatingFilter) {
    return true; // No rating filter selected, so hostel passes the filter
  }

  const hostelRating = hostel.averageRating || 0;

  // Compare the hostel's rating based on the selected rating filter
  switch (selectedRatingFilter) {
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



const CityWise = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    const navigate = useNavigate();  // Use useNavigate to get the navigate function
    const location = useLocation();
    const { city, imageSrc } = location.state || {};

    const [hostels, setHostels] = useState([]);
  console.log('city========', city);
  console.log('imageSrc========', imageSrc);
    
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedFacilities, setSelectedFacilities] = useState('');
    const [selectedRatingFilter, setSelectedRatingFilter] = useState('');

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

     
    
    
    const handleGenderSelect = (gender) => {
      console.log('Selected Gender:', gender);
      setSelectedGender(gender);
    };
    const handleFacilitiesSelect = (facility) => {
      console.log('Selected Facility:', facility);
      setSelectedFacilities(facility);
    };
      const [currentPage, setCurrentPage] = useState(1);
      const handleRatingFilterSelect = (ratingFilter) => {
        console.log('Selected Rating Filter:', ratingFilter);
        setSelectedRatingFilter(ratingFilter);
      };
      
     
      const filteredHostels = hostels.filter((hostel) => {
        const genderFilter = selectedGender === '' || hostel.customersGender === selectedGender;
        const facilitiesFilter = selectedFacilities === '' || hostel.facilities[selectedFacilities] === true;
      
        return genderFilter && facilitiesFilter && filterHostelByRating(hostel, selectedRatingFilter);
      });
      
      
      
      const itemsPerPage = 10;
      const totalItems = filteredHostels.length;
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedHostels = filteredHostels.slice(startIndex, endIndex);

      const handlePageChange = (page) => {
        setCurrentPage(page);
      };
    return (
        <>
        <Container fluid style = {{paddingLeft : "0px", paddingRight: "0px"}}>
            <Header/>
            <Navbar/>
            <div>
            <img src={imageSrc} width="100%" height="100%" alt="Logo" style={{objectFit: "cover"}}
            className="d-inline-block img-responsive"></img>  
            </div>
            <h1 className='h_style'>
                 Hostels in {city || 'City'}
            </h1 >
            <div>
                <Container fluid >
                    <Row className='top_style'>
                        <Col xs={1} sm={4} md={3} lg={4} xl={4}>
                        
                        </Col>
                        <Col xs={9} sm={4} md={5} lg={4} xl={4}>
                        <Filters
                         onGenderSelect={handleGenderSelect}
                         onFacilitiesSelect={handleFacilitiesSelect}
                         onRatingFilterSelect={handleRatingFilterSelect}
                         />
                    
                     </Col >
                        <Col xs={2} sm={4} md={4} lg={4} xl={4} >
                        
                        </Col>
                        </Row>
                </Container>
                <Container >
                    <Row >
                        <Col  xs={12} md={8}>
                        <Advertisement
                       city={city}
                       hostels={paginatedHostels}
                      selectedGender={selectedGender}
                      selectedFacilities={selectedFacilities}
                      selectedRatingFilter={selectedRatingFilter}
                      />                          

                        </Col>
                    </Row>
                </Container>
            </div>
            <Container fluid>
                <Row>
                    <Col xs={12} sm={2} md={3} lg={3} ></Col>
                    <Col xs={12} sm={8} md={6} lg={6}>
                        <Paginations itemsPerPage={itemsPerPage} totalItems={totalItems} onPageChange={handlePageChange} />
                    </Col>
                    <Col xs={12} sm={2} md={3} lg={3}></Col>
                </Row>
            </Container>
            <br></br>
            <Container fluid>
                <Row>
                <Popular city={city}/>
                </Row>
            </Container>
          </Container>
        </>
    );
}

export default CityWise;