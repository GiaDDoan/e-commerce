import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './Category.css';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import FilterBox from './filter-box/FilterBox';
import Product from '../product/Product';
import Pagination from '../pagination/Pagination';
import Loading from '../loading/Loading';
import { fetchItemsByCategory } from '../../api-helpers/index';
import ErrorPage from '../error-page/ErrorPage';

export default function Category({ filter, setFilter, initialFilter }) {
  const [status, setStatus] = useState('loading');
  const { categoryName, page } = useParams();
  const history = useHistory();
  const [res, setRes] = useState([]);

  useEffect(() => {
    setStatus('loading');
    setFilter({ ...initialFilter, category: categoryName });
    const fetchingItems = async () => {
      const res = await fetchItemsByCategory(categoryName, page);
      if (res.status === 201) {
        setRes(res);
        setStatus('idle');
      } else {
        console.log('ERR', res.message);
        setStatus('error');
      }
    };
    fetchingItems();
  }, [history.location.pathname]);

  if (status === 'loading') {
    return <Loading className="spinner-l" />;
  }

  if (status === 'idle') {
    const { items, uniqueCompanies } = res;

    return (
      <Wrapper className="category">
        <div className="category__filter">
          <FilterBox
            filter={filter}
            setFilter={setFilter}
            status={status}
            companies={uniqueCompanies}
          />
        </div>
        <div className="category__and__pagination">
          <div className="category__wrapper">
            {items.results.map((item, i) => {
              let checkedTitle = item.name;

              if (item.name.length > 60) {
                let splitting = item.name.split(' ');
                let totalLength = 0;

                for (var x = 0; x < splitting.length; x++) {
                  if (totalLength >= 50) {
                    checkedTitle = splitting
                      .slice(0, x)
                      .join(' ')
                      .concat('...');
                    break;
                  }
                  totalLength += splitting[x].length;
                }
              }

              return (
                <Product
                  name="category"
                  id={item._id}
                  title={checkedTitle}
                  price={item.price}
                  image={item.imageSrc}
                  stock={item.numInStock}
                  rating={item.rating}
                  item={item}
                  key={item._id}
                />
              );
            })}
          </div>

          <Pagination
            option="unfilter"
            items={items}
            categoryName={categoryName}
            page={page}
          />
        </div>
      </Wrapper>
    );
  }
  if (status === 'error') {
    return <ErrorPage />;
  }
}

const Wrapper = styled.div``;
