import styled from '@emotion/styled/macro';

const StyledTapPayFields = styled.form`
  width: 200px;
  height: 150px;
  border: black solid 1px;
  > .tpfield {
    display: inline-block;
    border: black solid 1px;
    width: 200px;
    height: 30px;
  }
  > button {
    border: black solid 1px;
    padding: 6px 20px;
    border-radius: 100px;
  }
`;

export default StyledTapPayFields;
