import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';



const BackendUrl = 'http://localhost:8000';

const CardComponent = ({ title, content,image,hostelId}) => { 
  const star1 = {
    color: '#FFD600',
    width: '8%',
    height: '8%',
  };
  const card_title = {
    color: 'white',
    backgroundColor: '#3C6B97',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
            {content}
        </Card.Text>
        <Link to={`/Hostel_ad/${hostelId}`}key={hostelId}className='hostelNameLink'> See Details</Link>
        {/* <Button >See Details</Button> */}
      </Card.Body>
    </Card>
        </>

  );
};

export default CardComponent;
