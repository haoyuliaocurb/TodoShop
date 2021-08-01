import { React } from 'react';
import StyledWelcoming from '../../styles/HomePage/StyledWelcoming';
import welcomingImg from '../../styles/HomePage/images/welcoming.jpeg';

const Welcoming = () => {
  return (
    <StyledWelcoming>
      <img alt="" src={welcomingImg} />
    </StyledWelcoming>
  );
};

export default Welcoming;
