import { React } from 'react';
import IconSearchPage from '../../styles/SearchPage/IconSearchPage';
import StyledIconBookmark from '../../styles/SearchPage/StyledIconBookmark';

const IconBookmark = ({ isBookmarked, handleIconBookmarkClick, iconBookmarkRef }) => {
  return (
    <StyledIconBookmark className="iconBookmark" ref={iconBookmarkRef}>
      {isBookmarked ? (
        <IconSearchPage.Bookmark
          className="IconBookmarkSelected"
          onClick={handleIconBookmarkClick}
        />
      ) : (
        <IconSearchPage.Bookmark
          className="IconBookmarkUnselected"
          onClick={handleIconBookmarkClick}
        />
      )}
    </StyledIconBookmark>
  );
};

export default IconBookmark;
