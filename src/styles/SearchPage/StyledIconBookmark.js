import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledIconBookmark = styled.button`
  > svg.IconBookmarkUnselected {
  }

  > svg.IconBookmarkSelected {
    * {
      stroke: ${styledVariables.color.pink400};
      fill: ${styledVariables.color.pink400};
    }
  }
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

export default StyledIconBookmark;
