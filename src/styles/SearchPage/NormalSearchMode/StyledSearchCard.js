import styled from '@emotion/styled/macro';
import { styledVariables } from '../../app/cssMaterial';

const StyledSearchCard = styled.div`
  position: relative;
  flex-shrink: 0;
  display: inline-block;
  width: 200px;
  height: 264px;
  // padding: 12px 20px 0 12px;
  /* border: black solid 1px; */

  @media (max-width: 432px) {
    width: 50%;
    min-width: 164px;
  }

  > img {
    position: relative;
    right: 8px;
    display: block;
    width: 146px;
    height: 146px;
    // border: black solid 1px;
    margin: 0 auto;
    object-fit: cover;

    @media (max-width: 400px) {
      width: 120px;
      height: 120px;
    }
  }

  > p.SearchCardTitle {
    position: relative;
    right: 8px;
    margin-top: 8px;
    padding: 0 ${styledVariables.NormalSearchMode.SearchCard.SelfPaddingHor};
    // border: black solid 1px;
    font-size: 14px;
    width: 200px;
    /* height: 146px; */
    height: 70px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    white-space: normal;
  }

  > p.SearchCardPrice {
    position: absolute;
    left: calc(${styledVariables.NormalSearchMode.SearchCard.SelfPaddingHor} - 6px);
    bottom: ${styledVariables.NormalSearchMode.SearchCard.SelfPaddingBottom};
    font-size: 14px;

    color: ${styledVariables.color.pink400};
    font-weight: 700;

    > .priceTag {
      margin-right: 6px;
    }
  }

  > .iconLike {
    position: absolute;
    top: 4px;
    right: 5px;
  }

  > .iconAdd2Cart {
    position: absolute;
    bottom: ${styledVariables.NormalSearchMode.SearchCard.SelfPaddingBottom};
    right: 0;
  }
`;

export default StyledSearchCard;
