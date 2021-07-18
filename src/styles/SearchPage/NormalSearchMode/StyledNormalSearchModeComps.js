import styled from '@emotion/styled/macro';
import { styledVariables } from '../../app/cssMaterial';

export const StyledSearchCard = styled.div`
  position: relative;
  flex-shrink: 0;

  display: inline-block;
  width: 200px;
  height: 264px;
  // padding: 12px 20px 0 12px;
  // border: black solid 1px;

  @media (max-width: 432px) {
    width: 50%;
    min-width: 164px;
  }

  &.bookmarked {
    background-color: burlywood;
    position: absolute;
    left: 0;
  }

  > img {
    position: relative;
    right: 8px;
    display: block;
    width: 146px;
    height: 146px;
    border: black solid 1px;
    margin: 0 auto;

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

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    display: -webkit-box;
    -webkit-line-clamp: 2;
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

  > svg.IconLikeUnselected {
    position: absolute;
    top: 4px;
    right: 0;
  }

  > svg.IconAdd2CartUnselected {
    position: absolute;
    bottom: ${styledVariables.NormalSearchMode.SearchCard.SelfPaddingBottom};
    right: 0;
  }
`;

export const StyledFilterBar = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: ${styledVariables.shared.barHeight};
  border: black solid 1px;
`;

export const StyledFeatureTag = styled.span`
  flex-shrink: 0;

  display: inline-block;
  // border: black 1px solid;
  padding: 6px 14px;
  background-color: ${styledVariables.color.gray100};
  border-radius: 100px;

  > h3 {
    font-weight: 400;
    color: ${styledVariables.color.gray300};
  }
`;

export const StyledFeatureTags = styled.div`
  display: flex;
  flex-wrap: nowrap;

  > :not(span:last-of-type) {
    margin-right: 10px;
  }
`;

export const StyledFeatureBar = styled.div`
  position: absolute;
  top: ${styledVariables.shared.barHeight};
  width: 100%;
  height: ${styledVariables.shared.barHeight};
  border: black solid 1px;
  overflow-x: scroll;
  display: flex;
  align-items: center;
`;

export const StyledNormalSearchMode = styled.div`
  position: relative;
  width: 100%;
  overflow-y: scroll;
  border: black solid 1px;

  > .SearchCardContainer {
    position: absolute;
    top: calc(${styledVariables.shared.barHeight} * 2);
    left: 0;
    right: 0;
    margin: 0 auto;
    // border: black solid 1px;
    width: 400px;
    height: calc(100% - ${styledVariables.shared.barHeight} * 2);

    @media (max-width: 432px) {
      width: 100%;
      min-width: 360px;
      padding: 0 16px;
    }

    @media (min-width: 600px) {
      width: 600px;
      margin: 0 auto;
    }

    @media (min-width: 800px) {
      width: 800px;
      margin: 0 auto;
    }
  }
`;
