import React from 'react';
import '../category/Category.css';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Product from '../product/Product';

function FilteredCategory() {
  const { filterId, page } = useParams();
  const filteredItems = useSelector((state) => state.filteredItems);

  if (filteredItems.status === 'loading') {
    return <div>Filtering items</div>;
  }
  if (filteredItems.status === 'idle' && filteredItems[filterId + '_' + page]) {
    console.log('filtereeeeeeeeeedd', filteredItems);
    console.log(filteredItems[filterId + '_' + page]);

    return (
      <Wrapper className="category__filtered">
        <div className="category__filtered__items">
          {filteredItems[filterId + '_' + page].results.map((item, i) => {
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
        <div>page</div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div``;
const ProductContainer = styled.div``;

export default FilteredCategory;
