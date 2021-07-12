// styling
import styled from '@emotion/styled/macro';
import { styledVariables } from '../../app/cssMaterial';

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
  width: 100%;
  height: 30px;
  overflow-x: scroll;
  margin-top: 6px;
`;

export const StyledSearchCard = styled.div`
  position: relative;
  flex-shrink: 0;

  display: inline-block;
  width: 116px;
  height: 192px;
  padding: 12px 0 ${styledVariables.SearchCard.SelfPaddingBottom} 0;
  margin-right: 10px;
  // border: black solid 1px;

  > img {
    display: block;
    width: 110px;
    margin: 0 auto;
    height: 110px;
  }

  > p.SearchCardTitle {
    margin-top: 8px;
    padding: 0 2px;
    // border: black solid 1px;

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
    bottom: ${styledVariables.SearchCard.SelfPaddingBottom};
    padding: 0 2px;

    color: ${styledVariables.color.pink400};
    font-weight: 700;

    > .priceTag {
      margin-right: 6px;
    }
  }

  > svg.IconBookmark {
    position: absolute;
    top: 4px;
    right: 10px;
  }

  > svg.IconAdd2CartUnselected {
    position: absolute;
    bottom: ${styledVariables.SearchCard.SelfPaddingBottom};
    right: 10px;
  }
`;

export const StyledSearchCards = styled.div`
  display: flex;
  overflow-x: scroll;
`;

export const StyledSearchItem = styled.div`
  position: relative;
  width: 100%;
  padding: 0 10px;
  padding-top: ${styledVariables.SearchItem.TitleHeight};
  margin-top: 6px;
  background-color: ${styledVariables.color.white};

  > .SearchItemTitle {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: ${styledVariables.SearchItem.TitleHeight};
    background-color: ${styledVariables.color.gray100};
    display: flex;
    justify-content: center;
    align-items: center;

    > h3 {
      color: ${styledVariables.color.gray300};
    }
  }
`;

export const StyledEasySearchPage = styled.div`
  overflow-y: scroll;

  > div:last-of-type {
    margin-bottom: 10px;
  }
`;
