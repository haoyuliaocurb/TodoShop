import styled from '@emotion/styled/macro';

const StyledFeatureTags = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  > span {
    margin-left: 10px;
  }
  // 做 feature bar 右邊的留白
  > span:last-of-type {
    margin-right: 10px;
    > *::after {
      position: absolute;
      content: ' ';
      height: 12px;
      width: 24px;
      margin-right: 10px;
    }
  }
`;

export default StyledFeatureTags;
