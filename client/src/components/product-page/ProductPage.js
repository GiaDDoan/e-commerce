import React, { useEffect, useState } from 'react';
import './ProductPage.css';
import { useParams } from 'react-router-dom';
import Samples from './samples/Samples';
import Loading from '../loading/Loading';

import { fetchProductById } from '../../api-helpers/index';
import { useSelector, useDispatch } from 'react-redux';
import {
  requestCart,
  receiveCart,
  addItem,
} from '../../store/reducers/cart/actions';
import { addItemToDB } from '../../api-helpers/cart-helper';
import ErrorPage from '../error-page/ErrorPage';

function ProductPage() {
  const { productId } = useParams();
  const [status, setStatus] = useState('loading');
  const [productRes, setProductRes] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setStatus('loading');

    const fetchingProduct = async () => {
      const res = await fetchProductById(productId);
      if (res.status === 200) {
        setProductRes(res);
        setStatus('idle');
      } else {
        setStatus('error');
        setErrorMsg(res.message);
      }
    };
    fetchingProduct();
  }, [productId]);

  const addItemToCart = async (item, userId, itemId, qty, stock) => {
    if (user.status === 'idle') {
      // const sendItemToDB = await addItemToDB(userId, itemId, qty, stock);
      // if (sendItemToDB.status == 201) {
      //   const action = addItem({ ...item, qty: quantity });
      //   dispatch(action);
      // } else if (sendItemToDB.status == 404) {
      //   console.log(sendItemToDB.message);
      // }
    } else {
      dispatch(requestCart());
      const action = addItem({ ...item, qty: quantity });
      dispatch(action);
    }
  };
  const addQuantity = (stock) => {
    if (stock > quantity) setQuantity(quantity + 1);
  };
  const removeQuantity = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'idle') {
    const { product, company } = productRes;
    const {
      _id,
      bodyLocation,
      category,
      companyId,
      imageSrc,
      name,
      numInStock,
      price,
    } = product;

    console.log('com', company);

    return (
      <div className="product-page-container">
        <div className="navigation">
          <div>{`Home > Category`}</div>
        </div>
        <div className="item-containeer">
          <div className="item-img-wrapper">
            <img src={imageSrc} alt="item-img" className="item-img" />
          </div>
          <div className="item-info-wrapper">
            <div className="item-name">{name}</div>
            <div className="base-fill item-tag">{bodyLocation}</div>
            <div>By: {company.name}</div>
            <div>Price: {price}</div>
            <div>Stock: {numInStock}</div>
            <div className="item-quantity-wrapper">
              <button onClick={() => removeQuantity()}>-</button>
              <div>{quantity}</div>
              <button onClick={() => addQuantity(numInStock)}>+</button>
            </div>
            <button
              onClick={() => {
                user.status == 'idle'
                  ? addItemToCart(
                      product,
                      user.data._id,
                      _id,
                      quantity,
                      numInStock
                    )
                  : addItemToCart(product, _id, quantity, numInStock);
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
        <div className="sample-container">
          <div className="sample-title">
            Similar products in the same Category
          </div>
          <Samples size={12} sampleKey={'category'} sample={category} />
        </div>
        <div className="sample-container">
          <div className="sample-title">
            Similar products in the same Company
          </div>
          <Samples size={12} sampleKey={'company'} sample={companyId} />
        </div>
      </div>
    );
  }
  if (status === 'error') {
    return <ErrorPage errorMsg={errorMsg} />;
  }
  return <div>s</div>;
}

export default ProductPage;
