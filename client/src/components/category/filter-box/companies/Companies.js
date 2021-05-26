import React, { useState } from 'react';
import styled from 'styled-components';
import './Companies.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Companies() {
  const { action, categoryName, page } = useParams();
  const items = useSelector((state) => state.items);

  if (items[categoryName]) {
    console.log('items', items[categoryName]);

    return (
      <Wrapper>
        {items[categoryName].map((company, i) => {
          return (
            <Company>
              <labe>
                <input
                  key={i}
                  type="checkbox"
                  // checked={checkbox.checked}
                  onChange={(e) => console.log('checked', i, e)}
                />
                {company.name}
              </labe>
            </Company>
          );
        })}
      </Wrapper>
    );
  } else {
    return null;
  }
}

const Wrapper = styled.div``;
const Company = styled.div``;

export default Companies;
