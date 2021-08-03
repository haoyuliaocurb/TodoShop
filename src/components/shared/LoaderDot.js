/* eslint-disable prettier/prettier */
import { React, useEffect, useRef } from 'react';
import StyledLoaderDot from '../../styles/shared/StyledLoaderDot';

const LoaderDot = () => {
  const dotFirst = useRef(null);
  const dotSecond = useRef(null);
  const dotThird = useRef(null);
  const startLoaderAnimation = (dotRef) => {
    const name = dotRef.current.classList[0];
    if (name === 'dot-first') {
      dotRef.current.classList.add('selected');
        dotRef.current.addEventListener('transitionend', () => {
          dotRef.current.classList.remove('selected');
          dotRef.current.addEventListener('transitionend', () => {
          setTimeout(startLoaderAnimation(dotSecond), 1000);
        }, { once: true })
      }, { once: true });
    }
    if (name === 'dot-second') {
      dotRef.current.classList.add('selected');
        dotRef.current.addEventListener('transitionend', () => {
          dotRef.current.classList.remove('selected');
          dotRef.current.addEventListener('transitionend', () => {
          setTimeout(startLoaderAnimation(dotThird), 1000);
        }, { once: true })
      }, { once: true });
    }
    if (name === 'dot-third') {
      dotRef.current.classList.add('selected');
        dotRef.current.addEventListener('transitionend', () => {
          dotRef.current.classList.remove('selected');
          dotRef.current.addEventListener('transitionend', () => {
          setTimeout(startLoaderAnimation(dotFirst), 4000);
        }, { once: true })
      }, { once: true });
    }    
  };
  useEffect(() => {
    startLoaderAnimation.bind(this);
    startLoaderAnimation(dotFirst);    
  }, []);

  return (
    <StyledLoaderDot>
      <span ref={dotFirst} className="dot-first dot" />
      <span ref={dotSecond} className="dot-second dot" />
      <span ref={dotThird} className="dot-third dot" />
    </StyledLoaderDot>
  );
};

export default LoaderDot;
