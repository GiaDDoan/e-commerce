import React, { useEffect, useState } from 'react';
import './ProductPage.css';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../api-helpers/index';

function ProductPage() {
  const { productId } = useParams();
  const [status, setStatus] = useState('loading');
  const [product, setProduct] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setStatus('loading');

    const fetchingProduct = async () => {
      const productRes = await fetchProductById(productId);
      if (productRes.status === 200) {
        console.log('RES', productRes);
        setProduct(productRes.product);
        setStatus('idle');
      } else {
        setStatus('error');
        setErrorMsg(productRes.message);
      }
    };
    fetchingProduct();
  }, [productId]);

  if (status === 'loading') {
    return <div>loading product</div>;
  }
  if (status === 'idle' && product[0]) {
    const item = product[0];
    console.log('item', item);

    return (
      <Wrapper>
        <div className="navigation">
          <div>{`Home > Category`}</div>
        </div>
        <div className="item">
          <img src={item.imageSrc} />
          <div className="item__info">
            <div>{item.name}</div>
            <div>Make a tag: {item.bodyLocation}</div>
            <div>Price: {item.price}</div>
            <div>Stock: {item.numInStock}</div>
            <button>Add to cart</button>
          </div>
        </div>
      </Wrapper>
    );
  }
  if (status === 'error') {
    return <Wrapper>{errorMsg}</Wrapper>;
  }
}

const Wrapper = styled.div`
  border: solid 2px blue;
`;
export default ProductPage;
