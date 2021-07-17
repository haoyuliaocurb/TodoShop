// script
import { React } from 'react';
// import { Link } from 'react-router-dom';

import SearchItems from './SearchItems';

import StyledEasySearchMode from '../../../styles/SearchPage/EasySearchMode/StyledEasySearchMode';

const EasySearchPage = () => {
  return (
    <StyledEasySearchMode>
      <SearchItems />
    </StyledEasySearchMode>
  );
};

export default EasySearchPage;
