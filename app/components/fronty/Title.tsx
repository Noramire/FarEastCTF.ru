import React, { HTMLAttributes } from 'react';
import { css, useTheme } from '@emotion/react';
import { motion } from 'framer-motion';
import Container from '../basis/Container';

type TitleProps = HTMLAttributes<HTMLDivElement> & {
  description?: string,
  children: string,
};

const animationTransiton = {
  duration: 1,
  type: 'spring',
  bounce: 0.2,
  mass: 0.4,
  stiffness: 50,
};

const variants = {
  initial: { y: -70, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Title = ({ description, children } : TitleProps) => {
  const { colors, mediaQueries } = useTheme();

  return (
    <>
      <Container
        css={css`
          border-bottom: 1px solid ${colors.border};
          justify-items: center;
          text-align: center;
          padding: 100px 0;
        `}
      >
        <motion.h1
          css={css`
            font-size: 70px;
            font-family: "RalewayBlack";
            margin: 0;

            ${mediaQueries.xl(`
              font-size: 50px;
            `)}
          `}
          initial="initial"
          animate="visible"
          variants={variants}
          transition={{ ...animationTransiton }}
        >
          {children}
        </motion.h1>
        {
          description && (
            <motion.p
              css={css`
                font-size: 30px;
                margin: 50px 0 0.67em;

                ${mediaQueries.xl(`
                  font-size: 20px;
                  margin: 20px 0 0.67em;
                `)}
              `}
              initial="initial"
              animate="visible"
              variants={variants}
              transition={{ ...animationTransiton, delay: 0.5 }}
            >
              {description}
            </motion.p>
          )
        }
      </Container>
    </>
  );
};

export default Title;
