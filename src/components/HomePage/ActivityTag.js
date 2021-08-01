import { React } from 'react';
import StyledActivityTag from '../../styles/HomePage/StyledActivityTag';

const ActivityTag = ({ content, className }) => {
  return (
    <StyledActivityTag className={className}>
      <h3>{content}</h3>
    </StyledActivityTag>
  );
};

export default ActivityTag;
