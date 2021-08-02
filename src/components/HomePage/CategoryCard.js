import { React } from 'react';
import { useHistory } from 'react-router-dom';
import StyledCategoryCard from '../../styles/HomePage/StyledCategoryCard';

const CategoryCard = ({ data }) => {
  const { name, image } = data;
  const history = useHistory();
  const handleCategoryCardClick = (nameValue) => {
    history.push(`/search?source=0&keywords=${nameValue}`);
  };
  return (
    <StyledCategoryCard
      onClick={() => {
        handleCategoryCardClick(name);
      }}
    >
      <img alt="" src={image} />
      <h3>{name}</h3>
    </StyledCategoryCard>
  );
};

export default CategoryCard;
