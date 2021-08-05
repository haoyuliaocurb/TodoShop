/* eslint-disable no-unused-vars */
import { React, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import IconSearchPage from '../../../styles/SearchPage/IconSearchPage';
import IconCart from '../../app/IconCart';
import IconBookmark from '../../app/IconBookmark';
import {
  StyledSearchCards,
  StyledSearchCard,
} from '../../../styles/SearchPage/EasySearchMode/StyledSearchCardsComps';
import ColumnMessage from '../../shared/ColumnMessage';
import IconShared from '../../../styles/shared/IconShared';

const SearchCard = ({
  pid,
  name,
  images,
  price,
  productAction,
  cardIdx,
  itemIdx,
  updateSearchCardInfo,
  showModolMessagePleaseSignIn,
  currentUid,
}) => {
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const isBookmarked = productAction ? productAction.bookmark || false : false;
  const isCarted = productAction ? productAction.cart || false : false;
  const iconCartRef = useRef(null);
  const iconBookmarkRef = useRef(null);
  const handleIconBookmarkClick = (e) => {
    e.stopPropagation();
    if (!currentUid) {
      showModolMessagePleaseSignIn();
      return;
    }
    iconBookmarkRef.current.classList.add('animation');
    iconBookmarkRef.current.addEventListener('animationend', () => {
      iconBookmarkRef.current.classList.remove('animation');
    });
    const getCurrentBookmark = () => {
      if (!isBookmarked) {
        return null;
      }
      if (!productAction.bookmark) {
        return null;
      }
      return productAction.bookmark;
    };
    const currentBookmark = getCurrentBookmark();
    const bookmarkedProductAction = {
      ...productAction,
      bookmark: !currentBookmark ? true : null,
    };
    updateSearchCardInfo(pid, bookmarkedProductAction, itemIdx, cardIdx, productAction);
  };
  const handleIconCartClick = (e) => {
    e.stopPropagation();
    if (!currentUid) {
      showModolMessagePleaseSignIn();
      return;
    }
    iconCartRef.current.classList.add('animation');
    iconCartRef.current.addEventListener('animationend', () => {
      iconCartRef.current.classList.remove('animation');
    });
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
    updateSearchCardInfo(pid, cartedProductAction, itemIdx, cardIdx, productAction);
  };
  const handleSelfClick = () => {
    history.push(`/product/${pid}`);
  };

  // <StyledSearchCard className={isBookmarked ? 'bookmarked' : ''}>
  return (
    <StyledSearchCard onClick={handleSelfClick}>
      <IconBookmark
        isBookmarked={isBookmarked}
        handleIconBookmarkClick={handleIconBookmarkClick}
        iconBookmarkRef={iconBookmarkRef}
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

const SearchCards = ({
  productsData,
  itemKey,
  itemIdx,
  updateSearchCardInfo,
  showModolMessagePleaseSignIn,
  currentUid,
}) => {
  // const [preProductsData, setPreProductsData] = useState(null);
  // const preItemKey = useRef(null);
  console.log('productsData: ', productsData);
  let newSearchCards = [];

  if (productsData) {
    newSearchCards = productsData.map((eachProductData, index) => {
      const { name, images, price, pid, productAction } = eachProductData;
      return (
        <SearchCard
          key={pid}
          pid={pid}
          name={name}
          images={images}
          price={price}
          productAction={productAction}
          cardIdx={index}
          itemIdx={itemIdx}
          updateSearchCardInfo={updateSearchCardInfo}
          showModolMessagePleaseSignIn={showModolMessagePleaseSignIn}
          currentUid={currentUid}
        />
      );
    });
  }

  // useEffect(() => {
  //   return () => {
  //     console.log('<SearchCards /> unmount');
  //   };
  // }, []);

  return (
    <StyledSearchCards>
      {!productsData || JSON.stringify(productsData) === JSON.stringify([]) ? (
        <ColumnMessage text="目前無相關搜尋結果" img={<IconShared.NoSearch />} />
      ) : (
        newSearchCards
      )}
    </StyledSearchCards>
  );
};

export default SearchCards;
