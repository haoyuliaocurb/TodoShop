// script
import { React } from 'react';
// import { Link } from 'react-router-dom';

import SearchItems from './SearchItems';

import IconSearchPage from '../../../styles/SearchPage/IconSearchPage';
import StyledEasySearchMode from '../../../styles/SearchPage/EasySearchMode/StyledEasySearchMode';

const EasySearchPage = ({ handleEasySearchButtonClick, searchInfo }) => {
  return (
    <StyledEasySearchMode>
      <button onClick={handleEasySearchButtonClick} type="button">
        <IconSearchPage.NormalSearch />
      </button>
      <SearchItems searchInfo={searchInfo} />
    </StyledEasySearchMode>
  );
};

export default EasySearchPage;
