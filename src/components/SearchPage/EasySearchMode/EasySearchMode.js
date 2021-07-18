// script
import { React } from 'react';
// import { Link } from 'react-router-dom';

import SearchItems from './SearchItems';

import StyledEasySearchMode from '../../../styles/SearchPage/EasySearchMode/StyledEasySearchMode';

const EasySearchPage = ({ searchInfo }) => {
  return (
    <StyledEasySearchMode>
      <SearchItems searchInfo={searchInfo} />
    </StyledEasySearchMode>
  );
};

export default EasySearchPage;
