import React, { useState } from 'react';
import styled from 'styled-components';
import './Companies.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Companies() {
  const { action, categoryName, page } = useParams();
  const items = useSelector((state) => state.items);

  if (items[categoryName]) {
    return (
      <Wrapper>
        <h3>Companies</h3>
        {items[categoryName].map((company, i) => {
          return (
            <Company key={company._id}>
              <label>
                <input
                  type="checkbox"
                  // checked={checkbox.checked}
                  onChange={(e) => console.log('checked', i, e)}
                />
                {company.name}
              </label>
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
