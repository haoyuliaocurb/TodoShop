import { useState, useEffect, useRef } from 'react';

const INIT_PAGEYOFFSETINFO = {
  prePageYOffset: 0,
  pageYOffset: 0,
};

const usePageYOffsetInfo = (targetComponent) => {
  const [pageYOffsetInfo, setPageYOffsetInfo] = useState(INIT_PAGEYOFFSETINFO);
  const prePageYOffset = useRef(0);
  const isOnScroll = useRef(false);

  if (targetComponent) {
    targetComponent.addEventListener('scroll', () => {
      // console.log('trigger addEventListener');
      if (isOnScroll.current) {
        return;
      }
      isOnScroll.current = true;
      const { pageYOffset } = window;
      const prePageYOffsetValue = prePageYOffset.current;
      prePageYOffset.current = pageYOffset;
      setPageYOffsetInfo({
        // eslint-disable-next-line object-shorthand
        prePageYOffset: prePageYOffsetValue,
        // eslint-disable-next-line object-shorthand
        pageYOffset: pageYOffset,
      });
    });
  }

  useEffect(() => {
    isOnScroll.current = false;
    console.log('pageYOffsetInfo: ', pageYOffsetInfo);
  });

  return pageYOffsetInfo;
};

export default usePageYOffsetInfo;
