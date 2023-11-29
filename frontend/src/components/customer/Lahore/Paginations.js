import React, { useState } from 'react';
import { Pagination, Container } from 'react-bootstrap';
import './Lahore.css';

const Pagination_1 = () => {
  const [activePage, setActivePage] = useState(4); // Default active page

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <Container >
      <Pagination className="pagination" style={{ paddingTop: '45px' }}>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item onClick={() => handlePageChange(1)}>{1}</Pagination.Item>
        <Pagination.Item onClick={() => handlePageChange(2)}>{2}</Pagination.Item>
        <Pagination.Item onClick={() => handlePageChange(3)}>{3}</Pagination.Item>
        <Pagination.Item active={activePage === 4} onClick={() => handlePageChange(4)}>
          {4}
        </Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item onClick={() => handlePageChange(10)}>{10}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
  </Container>
  );
};


export default Pagination_1;
