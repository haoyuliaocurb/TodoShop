import styled from '@emotion/styled/macro';
import { styledVariables } from '../../app/cssMaterial';

export const StyledSearchCard = styled.div`
  position: relative;
  flex-shrink: 0;

  display: inline-block;
  width: ${styledVariables.EasySearchMode.SearchCard.SelfWidth};
  height: 192px;
  padding: 12px 0 ${styledVariables.EasySearchMode.SearchCard.SelfPaddingBottom} 0;
  margin-right: ${styledVariables.EasySearchMode.SearchCard.SelfMarginRight};
  // border: black solid 1px;

  > img {
    // border: solid black 1px;
    display: block;
    width: 110px;
    margin: 0 auto;
    height: 110px;
    object-fit: cover;
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
    bottom: calc(${styledVariables.EasySearchMode.SearchCard.SelfPaddingBottom} + 4px);
    padding: 0 2px;

    color: ${styledVariables.color.pink400};
    font-weight: 700;

    > .priceTag {
      margin-right: 6px;
    }
  }

  > .iconBookmark {
    position: absolute;
    top: 4px;
    right: 10px;
  }

  > .iconAdd2Cart {
    position: absolute;
    bottom: ${styledVariables.EasySearchMode.SearchCard.SelfPaddingBottom};
    right: 10px;
  }
`;

export const StyledSearchCards = styled.div`
  display: flex;
  overflow-x: scroll;

  > p {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  /* ::before {
    display: inline-block;
    content: '';
    flex-shrink: 0;
    margin-right: calc(
      (
          ${styledVariables.EasySearchMode.SearchCard.SelfWidth} +
            ${styledVariables.EasySearchMode.SearchCard.SelfMarginRight}
        ) * 2
    );
  } */
`;
