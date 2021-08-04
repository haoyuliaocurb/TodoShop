import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledSimpleNavBar = styled.nav`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 ${styledVariables.shared.contentPadding};
  background-color: ${styledVariables.color.gray100};
  display: flex;
  justify-content: center;
  align-items: center;

  > a {
    > svg {
      position: absolute;
      left: ${styledVariables.shared.contentPadding};
      top: 0;
      bottom: 0;
      margin: auto 0;
      width: ${styledVariables.navBar.iconWidth};
      height: ${styledVariables.navBar.iconWidth};
      fill: ${styledVariables.color.gray700};

      * {
        fill: ${styledVariables.color.gray700};
      }
    }
  }

  > h1 {
    text-align: center;
  }
`;

export default StyledSimpleNavBar;
