import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledIconLike = styled.span`
  position: relative;
  display: inline-block;
  width: 22px;
  height: 22px;
  /* border: black solid 1px; */
  transform: scale(1, 1);
  /* display: flex;
  justify-content: center;
  align-items: center; */
  &.animation {
    animation-name: click;
    animation-duration: 0.5s;
  }

  @keyframes click {
    0% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1.1, 1.1);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  > .IconLikeUnselected {
    position: relative;
    top: -1px;
    width: 22px;
    height: 22px;
  }

  > .IconLikeSelected {
    width: 100%;
    height: 100%;

    fill: ${styledVariables.color.pink400};

    * {
      fill: ${styledVariables.color.pink400};
    }
  }
`;

export default StyledIconLike;
