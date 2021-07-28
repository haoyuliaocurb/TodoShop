import styled from '@emotion/styled/macro';
import { styledVariables } from '../../app/cssMaterial';

export const StyledFeatureTag = styled.span`
  flex-shrink: 0;

  display: inline-block;
  // border: black 1px solid;
  padding: 6px 14px;
  background-color: ${styledVariables.color.gray100};
  border-radius: 100px;

  > h3 {
    font-weight: 400;
    color: ${styledVariables.color.gray300};
  }
`;

export const StyledFeatureTags = styled.div`
  display: flex;
  flex-wrap: nowrap;

  > :not(span:last-of-type) {
    margin-right: 10px;
  }
`;

export const StyledFeatureBar = styled.div`
  width: 100%;
  /* height: 30px; */
  height: 0px;
  overflow-x: scroll;
  margin-top: 6px;
`;
