import { React } from 'react';

import {
  StyledFeatureTag,
  StyledFeatureTags,
  StyledFeatureBar,
} from '../../../styles/SearchPage/EasySearchMode/StyledFeatureBarComps';

const FeatureTag = () => {
  return (
    <StyledFeatureTag>
      <h3>抽取</h3>
    </StyledFeatureTag>
  );
};

const FeatureBar = () => {
  return (
    <StyledFeatureBar className="vb-hidden">
      <StyledFeatureTags>
        {Array.from({ length: 20 }).map(() => (
          <FeatureTag />
        ))}
      </StyledFeatureTags>
    </StyledFeatureBar>
  );
};

export default FeatureBar;
