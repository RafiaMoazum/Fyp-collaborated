import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const CardComponent = ({ title, content }) => {
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
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="/images/242009851.jpg" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
            {content}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
