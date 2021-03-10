import React from 'react';
import { css, Global, useTheme } from '@emotion/react';
import { motion } from 'framer-motion';

const AppGlobal = () => {
  const { colors } = useTheme();

  return (
    <>
      <Global
        styles={css`
          @font-face {
            font-family: 'BiryaniBlack';
            src: url("/fonts/biryani/Biryani-Black.ttf");
          }
          
          @font-face {
            font-family: 'Raleway';
            src: url("/fonts/raleway/Raleway-Regular.ttf");
          }
          
          @font-face {
            font-family: 'RalewayBold';
            src: url("/fonts/raleway/Raleway-Bold.ttf");
          }
          
          @font-face {
            font-family: 'RalewayBlack';
            src: url("/fonts/raleway/Raleway-Black.ttf");
          }

          html, body {
            font-family: 'Raleway';
          }

          ::selection {
            background-color: ${colors.primary};
          }
        `}
      />
      <motion.div
        css={css`
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          border: 1px solid ${colors.dark};
        `}
        variants={{
          active: {
            opacity: [0, 1, 0],
            width: ['0%', '99%'],
            transitionEnd: {
              display: 'none',
            },
          },
          inactive: {
            opacity: 0,
          },
        }}
        initial="inactive"
        animate="active"
      />
    </>
  );
};

export default AppGlobal;
