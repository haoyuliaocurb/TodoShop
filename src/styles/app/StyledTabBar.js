import styled from '@emotion/styled/macro';
import { styledVariables, removePx } from './cssMaterial';

const StyledTabBar = styled.div`
  position: fixed;
  bottom: ${({ pageYOffsetInfo }) => {
    const trialFunc = () => {
      const innerTrialFunc = (action) => {
        let counter = 0;
        switch (action) {
          case 0:
            counter -= 1;
            return counter;
          case 1:
            counter += 1;
            return counter;
          default:
            return counter;
        }
      };
      return innerTrialFunc;
    };
    const outerTrialFunc = trialFunc();
    console.log('counter add: ', outerTrialFunc(1));

    const { prePageYOffset, pageYOffset } = pageYOffsetInfo;
    const windowOffset = pageYOffset - prePageYOffset;
    const barHeight = removePx(styledVariables.shared.barHeight);
    // console.log('tabBarOffset: ', tabBarOffset);
    if (windowOffset <= 0) {
      return '0';
    }
    if (Math.abs(pageYOffset) < barHeight) {
      // console.log(`${tabBarOffset}px`);
      return `${windowOffset}px`;
    }
    // console.log(`${0 - barHeight}px`);
    return `${0 - barHeight}px`;
  }};
  width: 100%;
  height: ${styledVariables.shared.barHeight};
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

export default StyledTabBar;
