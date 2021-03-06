/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import styled from '@emotion/styled/macro';
import { styledVariables } from './cssMaterial';

const StyledGeneralTabBar = styled.div`
  background-color: ${styledVariables.color.gray100};
  display: flex;
  flex-wrap: nowrap;
  z-index: 10;
  padding: 0 ${styledVariables.shared.contentPadding};
  max-width: ${styledVariables.shared.contentTabBarMaxWidth};

  > a {
    margin-top: 7px;
    display: inline-block;
    flex: 100px 1 1;
    // border: solid blue 1px;
    // display: flex;
  }

  @media (min-width: ${styledVariables.shared.contentTabBarMaxWidth}) {
    border-radius: 100px;
  }


`;

export default StyledGeneralTabBar;
