import React, {
  useEffect,
  useState,
} from 'react';
import {
  motion,
  HTMLMotionProps,
  useViewportScroll,
  useTransform,
  useSpring,
} from 'framer-motion';

type MotionScrollProps = HTMLMotionProps<'div'> & {
  scrollParam: string,
  scrollLimits: number[],
  parentRef: React.MutableRefObject<any>,
  physics?: Record<string, any>,
};

const MotionScroll = ({
  children,
  scrollParam,
  style,
  scrollLimits,
  parentRef,
  physics = { damping: 15, mass: 0.8, stiffness: 100 },
  ...props
}: MotionScrollProps) => {
  const [params, setParams] = useState({ height: 0, top: 0 });
  const { scrollY } = useViewportScroll();

  const paramAnimation = useSpring(useTransform(
    scrollY,
    [params.top, params.top + params.height],
    scrollLimits,
  ), physics);

  useEffect(() => {
    if (typeof window == 'undefined' || !parentRef) return null;

    const callback = () => {
      const { height, top } = parentRef.current.getBoundingClientRect();

      setParams({
        height,
        top: top + window.scrollY - window.innerHeight / 2,
      });
    };

    window.addEventListener('resize', callback);
    callback();

    return (() => {
      window.removeEventListener('resize', callback);
    });
  }, [parentRef, typeof window]);

  return (
    <motion.div
      {...props}
      style={{
        ...style,
        [scrollParam]: paramAnimation,
      }}
    >
      {children}
    </motion.div>
  );
};

export default MotionScroll;
