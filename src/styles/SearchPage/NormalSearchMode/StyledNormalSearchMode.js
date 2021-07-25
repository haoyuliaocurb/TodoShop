import styled from '@emotion/styled/macro';
import { styledVariables } from '../../app/cssMaterial';

const StyledNormalSearchMode = styled.div`
  position: relative;
  width: 100%;
  // border: black solid 1px;

  > .SearchCardContainer {
    /* position: absolute;
    top: calc(${styledVariables.shared.barHeight} * 2);
    left: 0;
    right: 0; */
    margin: 0 auto;
    padding-top: calc(${styledVariables.shared.barHeight} * 3);
    padding-bottom: ${styledVariables.shared.barHeight};
    // border: black solid 1px;
    width: 400px;
    height: 100%;
    overflow-y: scroll;

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

export default StyledNormalSearchMode;
