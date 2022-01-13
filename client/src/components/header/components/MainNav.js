import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./MainNav.css";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  requestUser,
  receiveUser,
  sendError,
} from "../../../store/reducers/user/actions";
import { AppContext } from "../../../AppContext";
import Typehead from "../../typehead/Typehead";

function MainNav({ toggleCart }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const { cartToggle, setCartTottle } = useContext(AppContext);
  const history = useHistory();

  const responseSuccessGoogle = (response) => {
    dispatch(requestUser());

    axios({
      method: "POST",
      url: "/api/google-login",
      data: { tokenId: response.tokenId },
    }).then((response) => {
      // console.log('Google login success', response);
      dispatch(receiveUser(response.data.user));
    });
  };
  const responseErrorGoogle = () => {};

  const handleHistory = () => {
    history.push("/history");
  };

  return (
    <Wrapper className="header__main">
      <Logo to="/" className="header__logo">
        Commerci-E
      </Logo>
      <Typehead />
      <NavigationWrapper className="header__nav">
        {/* {user.status === "idle" ? (
          <Profile className="header__option">
            <span className="header__optionLineOne">Hello</span>
            <span className="header__optionLineTwo">{user.data.name}</span>
          </Profile>
        ) : (
          <SignIn className="header__option">
            <span className="header__optionLineOne">Hello Guest</span>
            <GoogleLogin
              clientId="904866829945-parp58ommnnc2c3r63euaod7m4s3jt28.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseSuccessGoogle}
              onFailure={responseErrorGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </SignIn>
        )} */}
        <div className="header__option returns-orders" onClick={handleHistory}>
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>
        <Basket className="header__optionBasket" onClick={toggleCart}>
          <ShoppingBasketIcon />
          <span className="header__optionLineTwo header__basketCount">
            {cart.items.length > 0 ? cart.items.length : 0}
          </span>
        </Basket>
      </NavigationWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div``;
const NavigationWrapper = styled.div``;
const Logo = styled(Link)``;
const SignIn = styled.div``;
const Profile = styled.div``;
const Basket = styled.div``;

export default MainNav;
