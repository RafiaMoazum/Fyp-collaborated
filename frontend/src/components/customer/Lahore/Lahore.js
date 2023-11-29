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

const Lahore = () => {


    return (
        <>
            <Header/>
            <Navbar/>
            <div>
            <img src="./images/minare.jpg" width="100%" height="650" alt="Logo" className="d-inline-block align-text-top"></img>  
            </div>
            <h1 className='h_style'>
                Best Hostels in Lahore
            </h1 >
            <div>
                <Container fluid >
                    <Row className='top_style'>
                        <Col xs={2} sm={2} md={2} lg={2} >
                        
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} style={{marginLeft: '25px'}}>
                            <Filters/>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2}>
                        
                        </Col>
                        </Row>
                </Container>
                <Container >
                    <Row >
                        <Col  xs={12} md={8}>
                            <Advertisement/>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container fluid>
                <Row>
                    <Col xs={1} sm={2} md={3} lg={4} ></Col>
                    <Col xs={10} sm={8} md={6} lg={4}>
                        <Paginations/>
                    </Col>
                    <Col xs={1} sm={2} md={3} lg={4}></Col>
                </Row>
            </Container>
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

export default Lahore;