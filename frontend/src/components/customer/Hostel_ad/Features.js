import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';

const Features = () => {
  const { hostelId } = useParams();
  const [hostelData, setHostelData] = useState({ facilities: {} });

  const HostelProfileData = async () => {
    try {
      const res = await fetch(`/hostelProfileData/${hostelId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log(`hostelsProfile✌: ${data}`);
        setHostelData(data);
      } else {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.error(err);
      // navigate('/loginPage');
    }
  };

  useEffect(() => {
    HostelProfileData();
  }, [hostelId]);

  const generateDynamicFeatures = () => {
    const { facilities } = hostelData;
    if (!facilities || Object.keys(facilities).length === 0) {
      return [];
    }

    const dynamicFeatures = Object.entries(facilities)
      .filter(([key, value]) => value === true)
      .map(([key]) => {
        return {
          icon: <FaCheck />,
          text: key.replace(/_/g, ' '), // Replace underscores with spaces
        };
      });

    return dynamicFeatures;
  };

  const dynamicFeatures = generateDynamicFeatures();

  const rowFeatures = [];
  for (let i = 0; i < dynamicFeatures.length; i += 3) {
    rowFeatures.push(dynamicFeatures.slice(i, i + 3));
  }

  return (
    <>
      {rowFeatures.map((row, rowIndex) => (
        <Row key={rowIndex} style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
          {row.map((feature, index) => (
            <Col sm key={index}>
              <p key={index}>{feature.icon} {feature.text}</p>
            </Col>
          ))}
        </Row>
      ))}
    </>
  );
};

export default Features;
