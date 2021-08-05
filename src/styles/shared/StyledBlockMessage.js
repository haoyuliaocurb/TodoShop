import styled from '@emotion/styled/macro';

const StyledBlockMessage = styled.div`
  width: 100%;
  height: 200px;
  /* border: black solid 1px; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .text {
    width: 100%;
    color: ${({ innerColor }) => innerColor};
    letter-spacing: 2px;
    text-align: center;
    line-height: 18px;
  }

  .img {
    width: 40px;
    height: 40px;
    margin: 0 auto;
    margin-bottom: 12px;

    > * {
      width: 100%;
      height: 100%;
      fill: ${({ innerColor }) => innerColor};

      * {
        fill: ${({ innerColor }) => innerColor};
      }
    }
  }
`;

export default StyledBlockMessage;
