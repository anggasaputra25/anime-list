import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { debounce } from 'lodash';

function MyPagination({handlePage, total}) {
  const [active, setActive] = useState(1);
  const totalPages = Math.ceil(total / 24);
  
  const handleClick = debounce((number) => {
      handlePage(number)
      setActive(number)
    }, 1000)
    
  const handleFirstPrev = () => {
    if (active > 1) {
        handleClick(1)
    }
  }
  
  const handleNext = () => {
    if (active < totalPages) {
      handleClick(active + 1)
    }
  };

  const handlePrev = () => {
    if (active > 1) {
      handleClick(active - 1);
    }
  };

  const items = [];
  for (let number = 1; number <= totalPages; number++) {
    if(active === 1 && number === 3){
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => handleClick(number)}>
              {number}
            </Pagination.Item>
        );
    }
    if (
        number === totalPages ||
        (number >= active - 1 && number <= active + 1)
    ) {
      items.push(
        <Pagination.Item key={number} active={number === active} onClick={() => handleClick(number)}>
          {number}
        </Pagination.Item>
      );
    }
    else if (number === active + 2) {
      items.push(<Pagination.Ellipsis key={`ellipsis-${number}`} />);
    }
    }

  return (
    <Pagination className='m-0 p-0 justify-content-end'>
        <Pagination.First onClick={handleFirstPrev} disabled={active === 1}/>
        <Pagination.Prev onClick={handlePrev} disabled={active === 1} />
        {items}
        <Pagination.Next onClick={handleNext} disabled={active === totalPages} />
    </Pagination>
  );
}

export default MyPagination;