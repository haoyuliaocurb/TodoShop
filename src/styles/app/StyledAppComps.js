// styling modules
import styled from '@emotion/styled/macro';
import { styledVariables, styledCSS } from './cssMaterial';

export const StyledNavBar = styled.nav`
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

export const StyledIconApp = styled.span`
  ${styledCSS.iconColorState};
  position: relative;
  // border: black solid 1px;

  > svg {
    display: block;
    width: ${styledVariables.tabBar.iconWidth};
    height: ${styledVariables.tabBar.iconWidth};
    margin: 0 auto;
  }

  > p.textIcon {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 3px 0;
    text-align: center;
    font-size: 10px;
  }
`;

export const StyledToolBar = styled.div`
  position: fixed;
  bottom: ${styledVariables.shared.barHeight};
  width: 100%;
  height: ${styledVariables.shared.barHeight};
  // border: solid 1px black;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 10;
  padding: 0 ${styledVariables.shared.contentPadding};

  > .buttonAddTodolist {
    height: 30px;
    padding: 0 10px;
    margin-right: 10px;
    background-color: ${styledVariables.color.pink100};
    border-radius: 100px;
  }
`;

export const StyledAppContent = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;
