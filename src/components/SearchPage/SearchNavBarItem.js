/* eslint-disable jsx-a11y/no-autofocus */
import { React } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import IconSearchPage from '../../styles/SearchPage/IconSearchPage';
import StyledSearchNavBarItem from '../../styles/SearchPage/StyledSearchNavBarItem';

const SearchNavBarItem = ({ index, handleNavBarItemClick, content, selected }) => {
  const location = useLocation();
  const history = useHistory();
  const handleIconCloseClick = (e) => {
    e.stopPropagation();
    const queryStrArr = decodeURI(location.search).split('=');
    let targetIdx = null;
    let length = 0;
    queryStrArr[queryStrArr.length - 1] = queryStrArr[queryStrArr.length - 1]
      .split('+')
      .map((keyword, tardetIdx) => {
        length += 1;
        if (keyword !== content) {
          return keyword;
        }
        targetIdx = tardetIdx;
        return '';
      })
      .join('+');
    if (targetIdx === 0) {
      queryStrArr[queryStrArr.length - 1] = queryStrArr[queryStrArr.length - 1].replace(/^\+/, '');
    } else if (targetIdx === length - 1) {
      queryStrArr[queryStrArr.length - 1] = queryStrArr[queryStrArr.length - 1].replace(/\+$/, '');
    } else {
      queryStrArr[queryStrArr.length - 1] = queryStrArr[queryStrArr.length - 1].replace('++', '+');
    }
    const newURL = `${location.pathname}${queryStrArr.join('=')}`;
    // console.log('newURL: ', newURL);
    history.push(newURL);
  };
  return (
    <StyledSearchNavBarItem
      type="button"
      onClick={() => {
        handleNavBarItemClick(index);
      }}
      className={selected ? 'selected' : ''}
    >
      {content}
      <IconSearchPage.Close onClick={handleIconCloseClick} />
    </StyledSearchNavBarItem>
  );
};

export default SearchNavBarItem;
