/* eslint-disable react/no-array-index-key */
import { React, useState, useRef } from 'react';
import IconShared from '../../styles/shared/IconShared';
import StyledCarousel from '../../styles/shared/StyledCarousel';

const Carousel = ({ imagesData }) => {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const carouselImgAmount = useRef(null);
  const handleIconLastImgClick = () => {
    setCarouselIdx((preCarouselIdx) => {
      if (preCarouselIdx === 0) {
        return carouselImgAmount.current - 1;
      }
      return preCarouselIdx - 1;
    });
  };
  const handleIconNextImgClick = () => {
    setCarouselIdx((preCarouselIdx) => {
      if (preCarouselIdx === carouselImgAmount.current - 1) {
        return 0;
      }
      return preCarouselIdx + 1;
    });
  };
  return (
    <StyledCarousel className="Carousel">
      <div className="CarouselContent">
        {imagesData.map((imageURL, index) => {
          if (index === carouselIdx) {
            carouselImgAmount.current = imagesData.length;
            return <img alt="" src={imageURL} />;
          }
          return <img alt="" src={imageURL} className="transparent" />;
        })}
        <button type="button" className="IconLastImg" onClick={handleIconLastImgClick}>
          <span className="background" />
          <IconShared.ChenvronLeft />
        </button>
        <button type="button" className="IconNextImg" onClick={handleIconNextImgClick}>
          <span className="background" />
          <IconShared.ChenvronRight />
        </button>
      </div>
      <div className="dotContainer">
        {imagesData.map((value, index) => {
          if (index === carouselIdx) {
            return <span key={index} className="dot focused" />;
          }
          return <span key={index} className="dot" />;
        })}
      </div>
    </StyledCarousel>
  );
};

export default Carousel;
