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


const CityWise = () => {
    const navigate = useNavigate();  // Use useNavigate to get the navigate function
    const location = useLocation();
    const { city, imageSrc } = location.state || {};

    const [hostels, setHostels] = useState([]);
  console.log('city========', city);
  console.log('imageSrc========', imageSrc);
    
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
      console.log('Selected Gender:', gender);
      setSelectedGender(gender);
    };
    const handleFacilitiesSelect = (facility) => {
      console.log('Selected Facility:', facility);
      setSelectedFacilities(facility);
    };
      const [currentPage, setCurrentPage] = useState(1);

      // Filtering hostels based on selected criteria
     
      const filteredHostels = hostels.filter((hostel) => {
        const genderFilter = selectedGender === '' || hostel.customersGender === selectedGender;
        const facilitiesFilter =selectedFacilities === '' || hostel.facilities[selectedFacilities] === true;
      
        return genderFilter && facilitiesFilter;
      });
      
      const itemsPerPage = 8;
      const totalItems = filteredHostels.length;
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedHostels = filteredHostels.slice(startIndex, endIndex);

      const handlePageChange = (page) => {
        setCurrentPage(page);
      };
    return (
        <>
            <Header/>
            <Navbar/>
            <div>
            <img src={imageSrc} width="100%" height="100%" alt="Logo" style={{objectFit: "cover"}}
            className="d-inline-block align-text-top img-responsive"></img>  
            </div>
            <h1 className='h_style'>
                Best Hostels in {city || 'City'}
            </h1 >
            <div>
                <Container fluid >
                    <Row className='top_style'>
                        <Col xs={2} sm={2} md={2} lg={2} >
                        
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} style={{marginLeft: '25px'}}>
                        <Filters
                         onGenderSelect={handleGenderSelect}
                         onFacilitiesSelect={handleFacilitiesSelect}
                         />
                    
                     </Col>
                        <Col xs={2} sm={2} md={2} lg={2}>
                        
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
                      />                          

                        </Col>
                    </Row>
                </Container>
            </div>
            <Container fluid>
                <Row>
                    <Col xs={1} sm={2} md={3} lg={4} ></Col>
                    <Col xs={10} sm={8} md={6} lg={4}>
                        <Paginations itemsPerPage={itemsPerPage} totalItems={totalItems} onPageChange={handlePageChange} />
                    </Col>
                    <Col xs={1} sm={2} md={3} lg={4}></Col>
                </Row>
            </Container>
            <br></br>
            <Container fluid>
                <Row>
                    <Col class="col-sm-1">
                        
                    </Col>
                    <Col class="col-sm-10">
                        <Popular/>
                    </Col>
                    <Col class="col-sm-1">

                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default CityWise;