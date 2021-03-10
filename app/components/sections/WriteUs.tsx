import React, { useContext } from 'react';
import { css, useTheme } from '@emotion/react';

import IntContext from '../../context/Internalization';
import { MotionInView } from '../utils';
import {
  Background,
  Section,
} from '../fronty';
import {
  Container,
  Button,
  Typography,
} from '../basis';
import { SectionProps } from '../fronty/Section';

type SectionWriteUsProps = SectionProps & {
  email: string,
};

const variants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      type: 'spring',
      bounce: 0.2,
      mass: 0.4,
      stiffness: 50,
      delay: 0.5,
    },
  },
  initial: {
    y: -70,
    opacity: 0,
  },
};

const SectionWriteUs = ({ email, ...props }: SectionWriteUsProps) => {
  const i18n = useContext(IntContext);
  const { colors } = useTheme();

  return (
    <>
      <Section
        css={css`
          display: flex;
          border-bottom: 1px solid ${colors.border};
          padding: 200px 0;
          text-align: center;
        `}
        {...props}
      >
        <Container>
          <MotionInView
            variants={variants}
            initial="initial"
            startAnimation="visible"
          >
            <Typography
              as="h1"
              fontSize="100px"
              fontSizeXl="50px"
              fontFamily="RalewayBold"
            >
              {i18n.t('pages.write_us.title')}
            </Typography>
          </MotionInView>
          <MotionInView
            css={{ margin: '50px 0' }}
            variants={variants}
            initial="initial"
            startAnimation="visible"
          >
            <Typography
              as="p"
              fontSize="40px"
              fontSizeXl="30px"
            >
              {i18n.t('pages.write_us.description')}
            </Typography>
          </MotionInView>
          <MotionInView
            variants={variants}
            initial="initial"
            startAnimation="visible"
          >
            <Button href={`mailto:${email}`}>
              {i18n.t('pages.write_us.write')}
            </Button>
          </MotionInView>
        </Container>
        <Background />
      </Section>
    </>
  );
};

export default SectionWriteUs;
