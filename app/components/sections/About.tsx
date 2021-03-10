import React, {
  useContext,
  useRef,
} from 'react';
import { css, useTheme } from '@emotion/react';
import IntContext from '../../context/Internalization';
import { MotionScroll, MotionInView } from '../utils';
import {
  Status,
  Background,
  Section,
} from '../fronty';
import {
  Grid,
  Column,
  Container,
  Button,
  Typography,
} from '../basis';
import { SectionProps } from '../fronty/Section';

type SectionAboutProps = SectionProps & {
  landingImage: {
    image: string,
  },
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
      delay: 0.4,
    },
  },
  initial: {
    y: -70,
    opacity: 0,
  },
};

const SectionAbout = ({ landingImage, ...props }: SectionAboutProps) => {
  const i18n = useContext(IntContext);
  const { colors, mediaQueries } = useTheme();

  const motionScrollRef = useRef(null);

  return (
    <>
      <Section
        css={css`
          padding: 200px 0;
          display: flex;
          border-bottom: 1px solid ${colors.border};
        `}
        {...props}
      >
        <Container size={3}>
          <Grid cols={6} colsXl={1}>
            <Column size={3} sizeXl={1}>
              <MotionInView
                initial="initial"
                variants={variants}
                startAnimation="visible"
              >
                <Status css={{ marginBottom: 40 }}>{i18n.t('pages.about.about_us')}</Status>
              </MotionInView>
              <MotionInView
                initial="initial"
                startAnimation="visible"
                variants={variants}
              >
                <Typography
                  as="h1"
                  fontSize="40px"
                  fontFamily="RalewayBlack"
                >
                  {i18n.t('pages.about.title')}
                </Typography>
              </MotionInView>
              <MotionInView
                initial="initial"
                variants={variants}
                startAnimation="visible"
              >
                <Typography
                  as="p"
                  fontSize="30px"
                >
                  {i18n.t('pages.about.description')}
                </Typography>
              </MotionInView>
            </Column>
            <Column />
            <Column size={2} sizeXl={1}>
              <MotionInView
                initial="initial"
                variants={{
                  initial: {
                    ...variants.initial,
                    scale: 1.3,
                  },
                  visible: {
                    ...variants.visible,
                    scale: 1,
                  },
                }}
                startAnimation="visible"
                ref={motionScrollRef}
                css={css`
                  ${mediaQueries.xl(`
                    margin: 80px 0 0;
                  `)}
                `}
              >
                <div
                  css={css`
                    position: relative;
                    width: 100%;
                    height: 30vw;
                  `}
                >
                  <MotionScroll
                    css={css`
                      display: block;
                      background: no-repeat center url(${landingImage?.image});
                      background-size: cover;
                      width: 100%;
                      height: 100%;
                      overflow: hidden;
                    `}
                    scrollLimits={[-50, 50]}
                    scrollParam="y"
                    parentRef={motionScrollRef}
                    transition={{ duration: 1, ease: 'circOut' }}
                  />
                  <Button
                    href="/about#gallery"
                    css={css`
                      position: absolute;
                      bottom: 20px;
                      right: -30px;
                      padding: 30px 40px;

                      ${mediaQueries.xl(`
                        left: 50%;
                        transform: translateX(-50%);
                      `)}
                    `}
                  >
                    {i18n.t('pages.about.open_gallery')}
                  </Button>
                </div>
              </MotionInView>
            </Column>
          </Grid>

        </Container>
        <Background />
      </Section>
    </>
  );
};

export default SectionAbout;
