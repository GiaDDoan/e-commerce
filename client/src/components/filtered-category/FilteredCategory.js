import React, { useEffect, useState } from 'react';
import './FilteredCategory.css';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Product from '../product/Product';
import Pagination from '../pagination/Pagination';
import FilterSendToNewPage from '../../function-helpers/FilterSendToNewPage';
import { useHistory } from 'react-router-dom';
import { fetchProductsByFilter } from '../../api-helpers/index';
import Loading from '../loading/Loading';

function FilteredCategory({ filter }) {
  const [res, setRes] = useState({});
  const [status, setStatus] = useState('loading');
  const { filterId, page } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const filteringItems = async () => {
      const result = await fetchProductsByFilter(filter, page);
      if (result.status === 200) {
        console.log('res', result);
        setRes(result.results);
        setStatus('idle');
      } else {
        setStatus('error');
      }
    };
    filteringItems();
  }, [page]);

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'idle') {
    return (
      <Wrapper className="category__filtered">
        <div className="category__filtered__items">
          {res.results.map((item, i) => {
            let checkedTitle = item.name;

            if (item.name.length > 60) {
              let splitting = item.name.split(' ');
              let totalLength = 0;

              for (var x = 0; x < splitting.length; x++) {
                if (totalLength >= 50) {
                  checkedTitle = splitting.slice(0, x).join(' ').concat('...');
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
                rating={item.rating}
                stock={item.numInStock}
                key={i}
              />
            );
          })}
        </div>

        <Pagination
          option="filter"
          items={res}
          categoryName={filterId}
          page={page}
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div``;

export default FilteredCategory;
