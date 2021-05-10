import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './Category.css';
import { useParams } from 'react-router-dom';

import { fetchItemsByCategory } from '../../api-helpers/index';

export default function Category() {
  const [status, setStatus] = useState('loading');
  const [items, setItems] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    setStatus('loading');
    const fetchingItems = async () => {
      const res = await fetchItemsByCategory(categoryName);
      if (res.status === 201) {
        setItems(res.items);
        setStatus('idle');
      } else {
        setStatus('error');
      }
    };
    fetchingItems();
  }, [categoryName]);

  if (status === 'loading') {
    return <div>Loading Items in Category</div>;
  }
  if (status === 'idle') {
    console.log('items', items);
    return (
      <Wrapper className="category">
        <div className="category__container">{categoryName}</div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div``;
