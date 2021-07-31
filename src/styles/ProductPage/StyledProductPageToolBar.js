import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledProductPageToolBar = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${styledVariables.color.gray100};
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .buttonToolBar {
    height: 30px;
    padding: 0 15px;
    margin-right: 10px;
    border-radius: 100px;
    min-width: 70px;
    margin-left: 15px;
  }

  .buttonAdd2Cart {
    background-color: ${styledVariables.color.pink400};
    color: ${styledVariables.color.white};
  }

  .buttonCarted {
    background-color: ${styledVariables.color.gray300};
    color: ${styledVariables.color.white};
  }
`;

export default StyledProductPageToolBar;
