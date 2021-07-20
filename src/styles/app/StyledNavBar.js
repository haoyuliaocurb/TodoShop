import styled from '@emotion/styled/macro';
import { styledVariables } from './cssMaterial';

const StyledNavBar = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: ${styledVariables.shared.barHeight};
  background-color: ${styledVariables.color.gray100};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  padding: 0 ${styledVariables.shared.contentPadding};

  > a {
    > img {
      position: absolute;
      left: ${styledVariables.shared.contentPadding};
      top: 0;
      bottom: 0;
      margin: auto 0;
      width: ${styledVariables.navBar.iconWidth};
      height: ${styledVariables.navBar.iconWidth};
    }
  }

  > h1 {
    text-align: center;
  }

  > button {
    position: absolute;
    top: 0;
    bottom: 0;
    right: ${styledVariables.shared.contentPadding};
    margin: auto 0;
    display: inline-block;
    width: ${styledVariables.navBar.buttonWidth};
    height: ${styledVariables.navBar.iconWidth};
    // border: solid 1px black;
  }
`;

export default StyledNavBar;
