import React from 'react';
import {FaCheck} from 'react-icons/fa';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Features = () => {
    const features = [
        { icon: <FaCheck />, text: 'Convenience store on site' },
        { icon: <FaCheck />, text: 'Valet parking' },
        { icon: <FaCheck />, text: 'Express check-in/out' },
        { icon: <FaCheck />, text: 'Dining area' },
        { icon: <FaCheck />, text: 'Elevator' },
        { icon: <FaCheck />, text: 'Currency exchange' },
        
      ];
      const rowFeatures = [];
        for (let i = 0; i < features.length; i += 3) {
        rowFeatures.push(features.slice(i, i + 3));
        }
    return (
        <>
            {rowFeatures.map((row, rowIndex) => (
            <Row key={rowIndex} style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                {row.map((feature, index) => (
                <Col sm key={index}>
                    <p>{feature.icon} {feature.text}</p>
                </Col>
                ))}
            </Row>
            ))}

        </>
    );
}

export default Features;