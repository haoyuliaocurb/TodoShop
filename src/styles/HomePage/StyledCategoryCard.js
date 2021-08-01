import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledCategoryCard = styled.div`
  position: relative;
  display: inline-block;
  width: ${styledVariables.HomePage.categoryCardWidth};
  height: ${styledVariables.HomePage.categoryCardWidth};
  /* border: black solid 1px; */
  flex-shrink: 0;
  background-color: ${styledVariables.color.gray100};
  &:not(div:first-of-type) {
    margin-left: 32px;
  }

  > img {
    position: relative;
    width: ${styledVariables.HomePage.categoryCardWidth};
    height: ${styledVariables.HomePage.categoryCardWidth};
    object-fit: cover;
    border-radius: 10px;
  }

  > h3 {
    position: absolute;
    bottom: -30px;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
    font-weight: 400;
  }
`;

export default StyledCategoryCard;
