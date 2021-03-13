import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import { css, useTheme } from '@emotion/react';
import { LocaleString } from '../../abstract/settings';
import IntContext from '../../context/Internalization';
import { MotionScroll, MotionInView } from '../utils';
import {
  Status,
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

type SectionSponsorsProps = SectionProps & {
  sponsors: { title: LocaleString, image: string, url: string }[],
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
      delay: 0.5,
    },
  },
  initial: {
    y: -70,
    opacity: 0,
  },
};

const SectionSponsors = ({ sponsors, landingImage, ...props }: SectionSponsorsProps) => {
  const i18n = useContext(IntContext);
  const { mediaQueries } = useTheme();

  const realRef = useRef(null);
  const carouselRef = useRef(null);
  const [carouselInfo, setCarouselInfo] = useState({ width: 1920 });

  useEffect(() => {
    if (carouselRef.current) {
      const { width } = carouselRef.current.getBoundingClientRect();
      setCarouselInfo({ width });
    }
  }, [carouselRef]);

  const phantomSponsors = useMemo(() => ([...sponsors, ...sponsors]), []);

  return (
    <>
      <Section
        css={css`
          padding: 0 0 100px 0;
          border-bottom: 1px solid #e6e6e6;
        `}
        {...props}
      >
        <div
          css={css`
            display: flex;
            width: 100%;
            overflow: hidden;
            margin: 150px 0;
          `}
        >
          <motion.div
            css={css`
              display: flex;
            `}
            ref={carouselRef}
            animate={{
              x: -carouselInfo.width / 2,
            }}
            transition={{
              duration: 40,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {phantomSponsors.map((sponsor, index) => (
              <div
                css={css`
                  width: 210px;
                  height: 110px;
                  filter: grayscale(1);
                  background: no-repeat center url(${sponsor.image});
                  background-size: contain;
                  margin-right: 50px;
                  opacity: 0.5;
                  transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

                  &:hover {
                    opacity: 1;
                    filter: grayscale(0);
                  }
                `}
                key={`${sponsor.image + index}`}
              />
            ))}
          </motion.div>
        </div>
        <div ref={realRef}>
          <Container size={3}>
            <Grid cols={6} colsXl={1}>
              <Column css={{ position: 'relative' }} size={2} sizeXl={1}>
                <MotionInView
                  initial="initial"
                  css={css`
                    height: 25vw;
                    position: relative;

                    ${mediaQueries.xl(`
                      margin: 0 0 100px;
                      height: 30vw;
                    `)}
                  `}
                  variants={{
                    initial: {
                      ...variants.initial,
                      scale: 1.3,
                    },
                    visible: {
                      ...variants.visible,
                      transition: {
                        ...variants.visible.transition,
                        delay: 0.2,
                      },
                      scale: 1,
                    },
                  }}
                  startAnimation="visible"
                >
                  <MotionScroll
                    parentRef={realRef}
                    scrollLimits={[-50, 50]}
                    scrollParam="y"
                    css={css`
                      width: 100%;
                      height: 100%;
                      background: no-repeat center url(${landingImage?.image});
                      background-size: cover;
                    `}
                  />
                  <Button
                    href="/sponsors"
                    css={css`
                      display: inline-flex;
                      padding: 30px 40px;
                      position: absolute;
                      bottom: 20px;
                      right: -30px;

                      ${mediaQueries.xl(`
                        left: 50%;
                        transform: translateX(-50%);
                      `)}
                    `}
                  >
                    {i18n.t('pages.sponsors.know_more')}
                  </Button>
                </MotionInView>
              </Column>
              <Column />
              <Column size={3} sizeXl={1}>
                <MotionInView startAnimation="visible" initial="initial" variants={variants}>
                  <Status css={{ marginBottom: 40 }}>{i18n.t('pages.sponsors.sponsors')}</Status>
                </MotionInView>
                <MotionInView
                  startAnimation="visible"
                  initial="initial"
                  variants={variants}
                >
                  <Typography
                    as="h1"
                    fontSize="40px"
                    fontFamily="RalewayBlack"
                  >
                    {i18n.t('pages.sponsors.title')}
                  </Typography>
                </MotionInView>
                <MotionInView
                  startAnimation="visible"
                  initial="initial"
                  variants={variants}
                >
                  <Typography
                    as="p"
                    fontSize="30px"
                    fontSizeMd="25px"
                  >
                    {i18n.t('pages.sponsors.description')}
                  </Typography>
                </MotionInView>
              </Column>
            </Grid>
          </Container>
        </div>
      </Section>
    </>
  );
};

export default SectionSponsors;
