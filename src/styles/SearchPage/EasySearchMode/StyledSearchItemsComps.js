import styled from '@emotion/styled/macro';
import { styledVariables } from '../../app/cssMaterial';

// eslint-disable-next-line import/prefer-default-export
export const StyledSearchItem = styled.div`
  position: relative;
  width: 100%;
  padding: 0 ${styledVariables.EasySearchMode.SearchItem.SelfPaddingHor};
  padding-top: ${styledVariables.EasySearchMode.SearchItem.TitleHeight};
  margin-top: 6px;
  background-color: ${styledVariables.color.white};

  > .SearchItemTitle {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: ${styledVariables.EasySearchMode.SearchItem.TitleHeight};
    background-color: ${styledVariables.color.gray100};
    display: flex;
    justify-content: center;
    align-items: center;

    > h3 {
      color: ${styledVariables.color.gray300};
    }
  }
`;
