import { React } from 'react';
import StyledActivityTag from '../../styles/HomePage/StyledActivityTag';

const ActivityTag = ({ content, className, handleActivityTagClick, index }) => {
  const handleClick = () => {
    if (!handleActivityTagClick) {
      return;
    }
    handleActivityTagClick(index);
  };
  return (
    <StyledActivityTag className={className} onClick={handleClick}>
      <h3>{content}</h3>
    </StyledActivityTag>
  );
};

export default ActivityTag;
