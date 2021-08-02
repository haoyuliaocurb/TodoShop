/* eslint-disable no-unused-vars */
import { React, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import StyledSearchCard from '../../styles/SearchPage/NormalSearchMode/StyledSearchCard';
import IconLike from '../app/IconLike';
import IconCart from '../app/IconCart';

const SearchCard = ({ eachProductData, updateSearchCardInfo, cardIdx, currentUid }) => {
  const history = useHistory();
  const { name, price, images, productAction, pid } = eachProductData;
  const isLiked = productAction ? productAction.like || false : false;
  const isCarted = productAction ? productAction.cart || false : false;
  const iconLikeRef = useRef(null);
  const iconCartRef = useRef(null);

  const handleIconLikeClick = (e) => {
    // console.log('trigger handleIconLikeClick');
    e.stopPropagation();
    if (!updateSearchCardInfo) {
      return;
    }
    if (!currentUid) {
      updateSearchCardInfo();
      return;
    }
    iconLikeRef.current.classList.add('animation');
    iconLikeRef.current.addEventListener(
      'animationend',
      () => {
        // console.log('true');
        iconLikeRef.current.classList.remove('animation');
      },
      { once: true },
    );

    const getCurrentLike = () => {
      if (!isLiked) {
        return null;
      }
      if (!productAction.like) {
        return null;
      }
      return productAction.like;
    };
    const currentLike = getCurrentLike();
    const likeedProductAction = {
      ...productAction,
      like: !currentLike ? true : null,
    };
    updateSearchCardInfo(pid, likeedProductAction, productAction, cardIdx);
  };
  const handleIconCartClick = (e) => {
    e.stopPropagation();
    if (!updateSearchCardInfo) {
      return;
    }
    if (!currentUid) {
      updateSearchCardInfo();
      return;
    }
    iconCartRef.current.classList.add('animation');
    iconCartRef.current.addEventListener(
      'animationend',
      () => {
        // console.log('true');
        iconCartRef.current.classList.remove('animation');
      },
      { once: true },
    );
    const getCurrentCart = () => {
      if (!isCarted) {
        return null;
      }
      if (!productAction.cart) {
        return null;
      }
      return productAction.cart;
    };
    const currentCart = getCurrentCart();
    const cartedProductAction = {
      ...productAction,
      cart: !currentCart ? { amount: 1 } : null,
    };
    updateSearchCardInfo(pid, cartedProductAction, productAction, cardIdx);
  };
  const handleSelfClick = () => {
    history.push(`/product/${pid}`);
  };

  return (
    <StyledSearchCard onClick={handleSelfClick}>
      <IconLike
        isLiked={isLiked}
        handleIconLikeClick={handleIconLikeClick}
        iconLikeRef={iconLikeRef}
      />
      <img alt="" src={images[0]} />
      <p className="SearchCardTitle">{name}</p>
      <p className="SearchCardPrice">
        <span className="priceTag">$</span>
        <span>{price}</span>
      </p>
      <IconCart
        isCarted={isCarted}
        handleIconCartClick={handleIconCartClick}
        iconCartRef={iconCartRef}
      />
    </StyledSearchCard>
  );
};

export default SearchCard;
