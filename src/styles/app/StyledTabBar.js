import styled from '@emotion/styled/macro';
import { styledVariables } from './cssMaterial';

const StyledTabBar = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: ${styledVariables.shared.barHeight};
  background-color: ${styledVariables.color.gray100};
  display: flex;
  flex-wrap: nowrap;
  z-index: 10;
  padding: 0 ${styledVariables.shared.contentPadding};

  > a {
    margin-top: 7px;
    display: inline-block;
    flex: 100px 1 1;
    // border: solid blue 1px;
    // display: flex;
  }
`;

export default StyledTabBar;
