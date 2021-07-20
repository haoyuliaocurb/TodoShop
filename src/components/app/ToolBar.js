import { React } from 'react';
import StyledToolBar from '../../styles/app/StyledToolBar';

const ToolBar = ({ toolBarState }) => {
  const { content, visibility } = toolBarState;
  return <StyledToolBar className={visibility ? '' : 'vb-hidden'}>{content}</StyledToolBar>;
};

export default ToolBar;
