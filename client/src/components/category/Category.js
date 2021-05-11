import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './Category.css';
import { useParams } from 'react-router-dom';

import Product from '../product/Product';
import { fetchItemsByCategory } from '../../api-helpers/index';

export default function Category() {
  const [status, setStatus] = useState('loading');
  const [items, setItems] = useState([]);
  const { categoryName, page } = useParams();

  useEffect(() => {
    setStatus('loading');
    const fetchingItems = async () => {
      const res = await fetchItemsByCategory(categoryName, page);
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
    console.log('items', items.results);
    console.log(page);
    return (
      <Wrapper className="category">
        {items.results.map((item) => {
          let rating = Math.random() * 1 + 4;

          return (
            <Product
              id={item._id}
              title={item.name}
              price={item.price}
              image={item.imageSrc}
              rating={rating}
            />
          );
        })}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div``;
