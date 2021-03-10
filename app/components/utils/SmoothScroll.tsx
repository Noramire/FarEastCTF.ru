import React, {
  useRef,
  useState,
  useEffect,
} from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import {
  useViewportScroll,
  useTransform,
  useSpring,
  motion,
} from 'framer-motion';
import { css } from '@emotion/react';

const SmoothScroll = ({ children }) => {
  const scrollRef = useRef(null);

  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => setPageHeight(entry.contentRect.height));
    });
    if (scrollRef) resizeObserver.observe(scrollRef.current);
    return () => resizeObserver.disconnect();
  }, [scrollRef]);

  const { scrollY } = useViewportScroll();

  const transform = useTransform(scrollY, [0, pageHeight], [0, -(pageHeight)]);
  const physics = { damping: 15, mass: 0.8, stiffness: 100 };
  const spring = useSpring(transform, physics);

  return (
    <>
      <motion.div
        ref={scrollRef}
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
          will-change: transform;
        `}
        style={{ y: spring }}
      >
        {children}
      </motion.div>
      <div css={{ height: pageHeight }} />
    </>
  );
};

export default SmoothScroll;
