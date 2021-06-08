import React, { useEffect } from 'react';
import '../category/Category.css';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Product from '../product/Product';
import FilterSendToNewPage from '../../function-helpers/FilterSendToNewPage';
import { useHistory } from 'react-router-dom';

function FilteredCategory() {
  const { filterId, page } = useParams();
  const filteredItems = useSelector((state) => state.filteredItems);
  const history = useHistory();

  useEffect(() => {
    if (page === 1) return;
    console.log('category page changed');
    //Fetch data with filter in result STATE
  }, [page]);

  if (filteredItems.status === 'loading') {
    return <div>Filtering items</div>;
  }
  if (filteredItems.status === 'idle' && filteredItems[filterId + '_' + page]) {
    console.log('filtereeeeeeeeeedd', filteredItems);
    // console.log('FILTER', filteredItems[filterId + '_' + page]);

    return (
      <Wrapper className="category__filtered">
        <div className="category__filtered__items">
          {filteredItems[filterId + '_' + page].items.results.map((item, i) => {
            let rating = Math.random() * 1 + 4;

            return (
              <ProductContainer key={item._id} className="category__container">
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
          })}
        </div>
        <div>{page}</div>
        {filteredItems[filterId + '_' + page].items.next ? (
          <button
            onClick={() =>
              FilterSendToNewPage(
                history,
                filterId,
                filteredItems[filterId + '_' + page].next.page
              )
            }
          >
            next
          </button>
        ) : null}
      </Wrapper>
    );
  }
  return <div>test</div>;
}

const Wrapper = styled.div``;
const ProductContainer = styled.div``;

export default FilteredCategory;
