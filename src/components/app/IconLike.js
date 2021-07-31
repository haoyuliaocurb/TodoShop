import { React } from 'react';
import IconSearchPage from '../../styles/SearchPage/IconSearchPage';
import StyledIconLike from '../../styles/SearchPage/StyledIconLike';

const IconLike = ({ isLiked, handleIconLikeClick, iconLikeRef }) => {
  return (
    <StyledIconLike className="iconLike" onClick={handleIconLikeClick} ref={iconLikeRef}>
      {isLiked ? (
        <IconSearchPage.LikeSelected className="IconLikeSelected" />
      ) : (
        <IconSearchPage.LikeUnselected className="IconLikeUnselected" />
      )}
    </StyledIconLike>
  );
};

export default IconLike;
