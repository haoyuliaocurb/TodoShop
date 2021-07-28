import { React } from 'react';
import StyledFeatureBar from '../../../styles/SearchPage/NormalSearchMode/StyledFeatureBar';
import StyledFeatureTags from '../../../styles/SearchPage/NormalSearchMode/StyledFeatureTags';
import FeatureTag from './FeatureTag';

const FeatureBar = ({ scrollOffsetInfo }) => {
  // const visibility = 1;
  const visibility = 0;
  const preScrollOffset = visibility !== 1 ? null : scrollOffsetInfo.preScrollOffset;
  const scrollOffset = visibility !== 1 ? null : scrollOffsetInfo.scrollOffset;
  const isScrollEnd = visibility !== 1 ? null : scrollOffsetInfo.isScrollEnd;
  // console.log('preScrollOffset: ', preScrollOffset, 'scrollOffset: ', scrollOffset);
  const windowOffset = visibility !== 1 ? null : scrollOffset - preScrollOffset;
  return (
    <StyledFeatureBar
      visibility={visibility}
      windowOffset={windowOffset}
      scrollOffset={scrollOffset}
      isScrollEnd={isScrollEnd}
      className={`${visibility ? '' : 'vb-hidden'} transition`}
    >
      <StyledFeatureTags>
        {Array.from({ length: 20 }).map(() => (
          <FeatureTag />
        ))}
      </StyledFeatureTags>
    </StyledFeatureBar>
  );
};

export default FeatureBar;
