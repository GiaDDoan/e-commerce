import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './Category.css';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import FilterBox from './filter-box/FilterBox';
import Product from '../product/Product';
import Pagination from '../pagination/Pagination';
import { fetchItemsByCategory } from '../../api-helpers/index';
import SendToPage from '../../function-helpers/SendToPage';
import { useSelector, useDispatch } from 'react-redux';
import {
  requestItems,
  receiveItems,
  sendError,
} from '../../store/reducers/items/actions';
import ErrorPage from '../error-page/ErrorPage';

const initialFilter = {
  min: null,
  max: null,
  companyIds: [],
  category: '',
  sort: '',
};

export default function Category() {
  const [status, setStatus] = useState('loading');
  const [filter, setFilter] = useState(initialFilter);
  const { categoryName, page } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  // const items = useSelector((state) => state.items);
  const [itemsRes, setItemsRes] = useState([]);

  useEffect(() => {
    // setStatus('loading');
    // setFilter({ ...initialFilter, category: categoryName });
    // if (items[categoryName + '_' + page]) {
    //   setStatus('idle');
    //   return;
    // }
    // dispatch(requestItems());
    // const fetchingItems = async () => {
    //   const res = await fetchItemsByCategory(categoryName, page);
    //   if (res.status === 201) {
    //     dispatch(
    //       receiveItems(categoryName, page, res.items, res.uniqueCompanies)
    //     ); //(category, categoryPage, items, uniqueCompanies)
    //     setStatus('idle');
    //   } else {
    //     dispatch(sendError(res.message));
    //     setStatus('error');
    //   }
    // };
    // fetchingItems();

    setStatus('loading');
    setFilter({ ...initialFilter, category: categoryName });
    const fetchingItems = async () => {
      const res = await fetchItemsByCategory(categoryName, page);
      if (res.status === 201) {
        setItemsRes(res.items);
        setStatus('idle');
      } else {
        console.log('ERR', res.message);
        setStatus('error');
      }
    };
    fetchingItems();
  }, [page]);

  // useEffect(() => {
  //   setStatus('loading');

  //   // if (!parseInt(page)) {
  //   //   return;
  //   // }
  //   if (page === '1') {
  //     setStatus('idle');
  //     return;
  //   }
  //   if (items[categoryName + '_' + page]) {
  //     setStatus('idle');
  //     return;
  //   }
  //   dispatch(requestItems());

  //   /////Fetch items by Category Only
  //   // if (parseInt(page)) {
  //   const fetchingItems = async () => {
  //     const res = await fetchItemsByCategory(categoryName, page);
  //     if (res.status === 201) {
  //       // setItems(res.items);
  //       dispatch(
  //         receiveItems(categoryName, page, res.items, res.uniqueCompanies)
  //       );
  //       setStatus('idle');
  //     } else {
  //       dispatch(sendError(res.message));
  //       setStatus('error');
  //     }
  //   };
  //   fetchingItems();
  //   // }
  // }, [page]);

  if (status === 'loading') {
    return <div>Loading Items in Category</div>;
  }
  if (status === 'idle') {
    return (
      <Wrapper className="category">
        <div className="category__filter">
          <FilterBox filter={filter} setFilter={setFilter} />
        </div>
        <div className="category__and__pagination">
          <div className="category__wrapper">
            {itemsRes.results.map((item, i) => {
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
            items={itemsRes}
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
