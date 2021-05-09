import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './SubNav.css';

import { fetchAllCategories } from '../../../api-helpers/index';

function SubNav() {
  const [status, setStatus] = useState('loading');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setStatus('loading');
    const fetchingAllCategories = async () => {
      const res = await fetchAllCategories();
      if (res.status === 200) {
        setCategories(res.categories);
        setStatus('idle');
      } else {
        setStatus('error');
      }
    };
    fetchingAllCategories();
  }, []);

  if (status === 'loading') {
    return <div>Loading Categories</div>;
  }
  if (status === 'idle') {
    console.log('cate', categories);
    return (
      <Wrapper className="sub_nav">
        {categories.map((category) => {
          return <Category className="category">{category}</Category>;
        })}
      </Wrapper>
    );
  }
}

const Wrapper = styled.ul``;
const Category = styled.li``;
export default SubNav;
