import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './Category.css';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import FilterBox from './filter-box/FilterBox';
import Product from '../product/Product';
import {
  fetchItemsByCategory,
  fetchCompanyById,
} from '../../api-helpers/index';
import SendToPage from '../../function-helpers/SendToPage';
import { useSelector, useDispatch } from 'react-redux';
import {
  requestItems,
  receiveItems,
  sendError,
} from '../../store/reducers/items/actions';
// import item from '../../../../server/models/item';

export default function Category() {
  const [companies, setCompanies] = useState([]);
  const [companyStatus, setCompanyStatus] = useState('loading');
  // const [items, setItems] = useState([]);
  const { action, categoryName, page } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  // useEffect(() => {
  //   dispatch(requestItems());
  //   const fetchingFilteredItems = async () => {};
  //   fetchingFilteredItems();
  // }, [action]);

  useEffect(() => {
    if (items[categoryName + '_' + page]) return;
    dispatch(requestItems());
    setCompanyStatus('loading');
    const fetchingItems = async () => {
      const res = await fetchItemsByCategory(categoryName, page);
      if (res.status === 201) {
        // await res.uniqueCompanyIds.map(async (id) => {
        //   const companyRes = await fetchCompanyById(id);
        //   setCompanies([...companies, companyRes.company[0]]);
        // });
        // console.log(res.uniqueCompanyIds.length);
        let companyArray = [];
        for (let i = 0; i < res.uniqueCompanyIds.length; i++) {
          const companyRes = await fetchCompanyById(res.uniqueCompanyIds[i]);
          // console.log('res', companyRes);
          companyArray.push(companyRes.company[0]);
          if (i === res.uniqueCompanyIds.length - 1) {
            console.log('ARRAY', companyArray);
          }
        }

        dispatch(receiveItems(categoryName + '_' + page, res.items));
      } else {
        dispatch(sendError(res.message));
      }
    };
    fetchingItems();
  }, [categoryName]);

  useEffect(() => {
    // console.log('page changed');
    if (!parseInt(page)) {
      // console.log('inside true');
      return;
    }
    if (items[categoryName + '_' + page]) return;
    dispatch(requestItems());

    /////Fetch items by Category Only
    if (parseInt(page)) {
      const fetchingItems = async () => {
        const res = await fetchItemsByCategory(categoryName, page);
        if (res.status === 201) {
          // setItems(res.items);
          dispatch(receiveItems(categoryName + '_' + page, res.items));
        } else {
          dispatch(sendError(res.message));
        }
      };
      fetchingItems();
    }
  }, [page]);

  if (items.status === 'loading') {
    return <div>Loading Items in Category</div>;
  }
  if (items.status === 'idle') {
    // console.log('state ', items);
    // console.log('TST', action, categoryName, page);
    // console.log('test', categoryName, page);
    // console.log('state', companies);
    console.log('map', companies);

    return (
      <Wrapper className="category">
        <div className="category__filter">
          <FilterBox />
        </div>
        <div className="category__and__pagination">
          <div className="category__wrapper">
            {action === 'category' && items[categoryName + '_' + page] ? (
              items[categoryName + '_' + page].results.map((item, i) => {
                let rating = Math.random() * 1 + 4;
                return (
                  <ProductContainer key={i} className="category__container">
                    <Product
                      name="category"
                      id={item._id}
                      title={item.name}
                      price={item.price}
                      image={item.imageSrc}
                      rating={rating}
                      key={i}
                    />
                  </ProductContainer>
                );
              })
            ) : (
              <div>Load</div>
            )}
          </div>
          {/* PAGINATION TO CHANGE */}
          {items[categoryName + '_' + page] ? (
            <Pagination>
              {items[categoryName + '_' + page].previous ? (
                <button
                  onClick={() =>
                    SendToPage(
                      categoryName,
                      items[categoryName + '_' + page].previous.page,
                      history
                    )
                  }
                >
                  Prev
                </button>
              ) : null}
              {/* Tenary for pages */}
              {items[categoryName + '_' + page].next &&
              items[categoryName + '_' + page].next.page === 2 ? (
                <>
                  <button>1</button>
                  <button
                    onClick={() =>
                      SendToPage(
                        categoryName,
                        items[categoryName + '_' + page].next.page,
                        history
                      )
                    }
                  >
                    {items[categoryName + '_' + page].next.page}
                  </button>
                </>
              ) : null}
              {items[categoryName + '_' + page].next &&
              items[categoryName + '_' + page].previous ? (
                <>
                  <button
                    onClick={() =>
                      SendToPage(
                        categoryName,
                        items[categoryName + '_' + page].previous.page,
                        history
                      )
                    }
                  >
                    {items[categoryName + '_' + page].previous.page}
                  </button>
                  <button
                    onClick={() => SendToPage(categoryName, page, history)}
                  >
                    {page}
                  </button>
                  <button
                    onClick={() =>
                      SendToPage(
                        categoryName,
                        items[categoryName + '_' + page].next.page,
                        history
                      )
                    }
                  >
                    {items[categoryName + '_' + page].next.page}
                  </button>
                </>
              ) : null}
              {items[categoryName + '_' + page].next ? (
                <button
                  onClick={() =>
                    SendToPage(
                      categoryName,
                      items[categoryName + '_' + page].next.page,
                      history
                    )
                  }
                >
                  Next
                </button>
              ) : null}
            </Pagination>
          ) : null}
        </div>
      </Wrapper>
    );
  }
  return <div>Load</div>;
}

const Wrapper = styled.div``;
const ProductContainer = styled.div``;
const Pagination = styled.div`
  background-color: #eeeeee;
`;
