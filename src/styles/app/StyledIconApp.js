import styled from '@emotion/styled/macro';
import { styledVariables, styledCSS } from './cssMaterial';

const StyledIconApp = styled.span`
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

export default StyledIconApp;
