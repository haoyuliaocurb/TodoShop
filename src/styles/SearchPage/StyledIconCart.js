import styled from '@emotion/styled/macro';

const StyledIconCart = styled.span`
  display: inline-block;
  /* border: black solid 1px; */
  width: 30px;
  height: 22px;

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
`;

export default StyledIconCart;
