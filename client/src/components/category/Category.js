import React from 'react';
import styled from 'styled-components';
import './Category.css';
import { useParams } from 'react-router-dom';

export default function Category() {
  const { categoryName } = useParams();
  console.log(categoryName, 'cat');

  return (
    <Wrapper className="category">
      <div className="category__container">{categoryName}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
