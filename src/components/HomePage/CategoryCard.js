import { React } from 'react';
import StyledCategoryCard from '../../styles/HomePage/StyledCategoryCard';

const CategoryCard = ({ data }) => {
  const { name, image } = data;
  return (
    <StyledCategoryCard>
      <img alt="" src={image} />
      <h3>{name}</h3>
    </StyledCategoryCard>
  );
};

export default CategoryCard;
