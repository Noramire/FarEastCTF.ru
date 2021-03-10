/* eslint-disable no-undef */
import React, {
  useMemo,
  useEffect,
  forwardRef,
  useCallback,
  HTMLAttributes,
} from 'react';
import { motion, HTMLMotionProps, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type Props = HTMLAttributes<HTMLElement> & HTMLMotionProps<any>;

type MotionInViewProps = Props & {
  startAnimation: string,
  backAnimation?: string,
  as?: string,
  threshold?: number,
};

const MotionInView = forwardRef<any, MotionInViewProps>(({
  children,
  startAnimation,
  backAnimation,
  threshold = 0,
  as = 'div',
  ...props
}, ref) => {
  if (typeof as != 'string') throw new Error('Field as has to be string, not anything else.');

  const controls = useAnimation();
  const { ref: inViewRef, inView } = useInView({ threshold, triggerOnce: !backAnimation });

  useEffect(() => {
    if (inView) {
      controls.start(startAnimation);
    } else if (backAnimation && !inView) {
      controls.start(backAnimation);
    }
  }, [inView]);

  const Tag = useMemo(() => motion<Props>(as), []);

  const setRefs = useCallback(
    (node) => {
      // eslint-disable-next-line no-param-reassign
      if (ref) (ref as any).current = node;
      inViewRef(node);
    },
    [inViewRef, ref],
  );

  return (
    <Tag
      {...props}
      animate={controls}
      ref={setRefs}
    >
      {children}
    </Tag>
  );
});

export default MotionInView;
