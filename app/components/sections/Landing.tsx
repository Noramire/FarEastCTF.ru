import React, {
  useEffect,
  useState,
  useRef,
  useContext,
} from 'react';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import Slick from 'react-slick';
import { css, useTheme } from '@emotion/react';
import { Post } from '../../abstract/post';
import { LocaleString } from '../../abstract/settings';

import IntContext from '../../context/Internalization';
import {
  Status,
  Section,
} from '../fronty';
import {
  Grid,
  Column,
  Button,
  List,
  Item,
  Linkp,
  Typography,
} from '../basis';
import { SectionProps } from '../fronty/Section';

type SectionLandingProps = SectionProps & {
  slides: Post[],
  socials: {
    title: LocaleString,
    url: string,
  }[],
};

const animationTransiton = {
  duration: 1,
  type: 'spring',
  bounce: 0.2,
  mass: 0.4,
  stiffness: 50,
};

const SectionLanding = ({
  slides,
  socials,
  ...props
}: SectionLandingProps) => {
  const i18n = useContext(IntContext);
  const locale = i18n.locale();
  const { colors, mediaQueries } = useTheme();

  const loaderAnimation = useAnimation();
  const indexAnimation = useAnimation();
  const [sliderHovered, setSliderHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slick>();

  useEffect(() => {
    indexAnimation.start('appear');

    if (typeof document == 'undefined') return null;

    const onVisibilityChange = () => {
      if (document.hidden) {
        loaderAnimation.stop();
        if (sliderRef.current) {
          sliderRef.current.slickPause();
        }
      } else {
        loaderAnimation.start('working');
        if (sliderRef.current) {
          sliderRef.current.slickPlay();
        }
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return (() => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    });
  }, []);

  return (
    <>
      <Section
        css={css`
          border-bottom: 1px solid ${colors.border};
          height: calc(100vh - 106px - 1px);

          ${mediaQueries.xl(`
            height: auto;
          `)}
        `}
        {...props}
      >
        <Grid css={{ height: '100%' }}>
          <Column size={2}>
            <div
              css={css`
                display: flex;
                flex-grow: 1;
                flex-direction: column;
                justify-content: center;
                padding: 0 20%;
                box-sizing: border-box;
                width: 100%;
                height: calc(100% - 80px);

                ${mediaQueries.xl(`
                  padding: 100px 5%;
                  height: calc(100vh - 106px - 80px - 1px);
                `)}
              `}
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={animationTransiton}
              >
                <Status css={{ marginBottom: 40 }}>
                  {i18n.t('pages.home.who_we_are')}
                </Status>
              </motion.div>
              <motion.div
                initial={{ y: -70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={animationTransiton}
              >
                <Typography
                  as="h1"
                  fontSize="50px"
                  fontSizeXl="45px"
                  fontFamily="RalewayBlack"
                  css={css`
                    margin: 0 0 40px;

                    ${mediaQueries.xl(`
                      margin-bottom: 30px;
                    `)}
                  `}
                >
                  {i18n.t('pages.home.logo')}
                </Typography>
              </motion.div>
              <motion.div
                initial={{ y: 70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={animationTransiton}
              >
                <Typography
                  as="p"
                  fontSize="40px"
                  fontSizeLg="35px"
                  fontSizeXl="30px"
                  css={{ margin: 0 }}
                >
                  {i18n.t('pages.home.description')}
                </Typography>
              </motion.div>
            </div>
            <div
              css={css`
                display: flex;
                height: 80px;
                border-top: 1px solid ${colors.border};
                border-right: 1px solid ${colors.border};
              `}
            >
              <div
                css={css`
                  min-width: 80px;
                  width: 80px;
                  height: 100%;
                  background: ${colors.primary};
                  display: flex;
                  justify-content: center;

                  ${mediaQueries.sm(`
                    margin-top: -80px;
                  `)}
                `}
              >
                <motion.div
                  css={css`
                    align-self: center;
                    height: 40px;
                    width: 20px;
                    border: 2px solid ${colors.light};
                    border-radius: 30px;
                    display: flex;
                    justify-content: center;

                    ${mediaQueries.sm(`
                      border-radius: 5px;
                    `)}
                  `}
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  <motion.div
                    css={css`
                      background: ${colors.light};
                      width: 3px; height: 3px;
                      border-radius: 90px;
                      margin-top: 5px;
                    `}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: [0, 1, 0], y: 20 }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </motion.div>
              </div>
              <div
                css={css`
                  display: flex;
                  align-self: center;
                  padding: 0 50px;

                  ${mediaQueries.sm(`
                    margin-left: -80px;
                    padding: 0;
                    width: 100%;
                    justify-content: center;
                  `)}
                `}
              >
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: 'circOut' }}
                  css={css`
                    margin-right: 25px;

                    ${mediaQueries.lg(`
                      display: none;
                    `)}

                    ${mediaQueries.xl(`
                      display: block;
                    `)}

                    ${mediaQueries.md(`
                      display: none;
                    `)}
                  `}
                >
                  <span>{i18n.t('pages.home.socials')}</span>
                </motion.div>
                <List
                  css={css`
                    flex-direction: row !important;
                  `}
                >
                  {socials.map((social, index) => (
                    <Item
                      css={css`
                        margin-right: 25px;
                      `}
                      key={social.title[locale]}
                    >
                      <motion.div
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.3 }}
                      >
                        <Linkp
                          href={social.url}
                          primaryColor={colors.dark}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {social.title[locale]}
                        </Linkp>
                      </motion.div>
                    </Item>
                  ))}
                </List>
              </div>
            </div>
          </Column>
          <Column size={3} className="s-landing-slider">
            <div className="s-landing-slider__indexer">
              <motion.span
                className="s-landing-slider__indexer-text"
                initial="exit"
                animate={indexAnimation}
                variants={{
                  appear: { opacity: 1, y: [-20, 0] },
                  exit: { opacity: 0, y: 20 },
                }}
                transition={{ duration: 0.5 }}
              >
                {`0${currentSlide + 1}`}
              </motion.span>
            </div>
            <div css={css`
                height: calc(100% - 80px);
                width: calc(100% - 137px);

                ${mediaQueries.xl(`
                  height: calc(100vh - 80px - 1px);
                  width: 100%;
                `)}
              `}
            >
              <Slick
                slidesToShow={1}
                slidesToScroll={1}
                arrows={false}
                autoplay
                autoplaySpeed={5000}
                easing="circInOut"
                ref={sliderRef}
                className="s-landing-slick"
                onReInit={() => {
                  if (!sliderHovered) {
                    loaderAnimation.start('working');
                  }
                }}
                beforeChange={async () => {
                  await indexAnimation.start('exit');
                }}
                afterChange={(current) => {
                  setCurrentSlide(current);

                  indexAnimation.start('appear');
                }}
              >
                {slides.map((post) => (
                  <div
                    key={post.id}
                    className="s-landing-slider__item"
                  >
                    <div className="s-landing-slider__info">
                      <span className="s-landing-slider__title">
                        {post.title[locale]}
                      </span>
                      <span className="s-landing-slider__description">
                        {post.description[locale]}
                      </span>
                      <Link href={`/posts/${encodeURIComponent(post.slug)}`}>
                        <a className="s-landing-slider__more">
                          <span className="s-landing-slider__more-text">{i18n.t('pages.home.more')}</span>
                          <span className="s-landing-slider__more-line" />
                        </a>
                      </Link>
                    </div>
                    <motion.div
                      css={css`
                        position: absolute;
                        top: 0; left: 0;
                        z-index: 0;
                        width: 100%;
                        height: 100%;
                        background: no-repeat center url(${post.thumbnail});
                        background-size: cover;
                        box-shadow: inset 0px -40px 100px 30px rgb(0 0 0 / 50%);
                        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
                        opacity: 0.6;
                      `}
                      onTap={() => {
                        // router.push(post.permalink);
                      }}
                      onHoverStart={() => {
                        loaderAnimation.stop();
                        setSliderHovered(true);
                      }}
                      onHoverEnd={() => {
                        setSliderHovered(false);
                      }}
                    />
                  </div>
                ))}
              </Slick>
            </div>
            <div className="s-landing-slider__background">
              <div
                className="s-landing-slider__background-col s-landing-slider__loader"
                css={css`
                  ${mediaQueries.sm(`
                    width: 50% !important;
                  `)}
                `}
              >
                <motion.span
                  className="s-landing-slider__loader-sign"
                  initial="exit"
                  animate={indexAnimation}
                  variants={{
                    appear: { opacity: 1, y: [-10, 0] },
                    exit: { opacity: 0, y: 10 },
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {`0${currentSlide + 1}`}
                </motion.span>
                <span className="s-landing-slider__loader">
                  <motion.span
                    className="s-landing-slider__loader-value"
                    animate={loaderAnimation}
                    variants={{
                      working: {
                        transition: {
                          duration: 5,
                        },
                        width: ['0%', '100%'],
                      },
                    }}
                  />
                </span>
                <motion.span
                  className="s-landing-slider__loader-sign"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {`0${slides.length}`}
                </motion.span>
              </div>
              <div
                className="s-landing-slider__background-col"
                css={css`
                  ${mediaQueries.sm(`
                    display: none !important;
                  `)}
                `}
              />
              <div
                className="s-landing-slider__background-col"
                css={css`
                  ${mediaQueries.sm(`
                    width: 50% !important;
                  `)}
                `}
              >
                <Button
                  href="/posts"
                  css={css`
                    display: flex;
                    justify-content: center;
                    width: 100%;
                  `}
                >
                  {i18n.t('pages.home.all_posts')}
                </Button>
              </div>
            </div>
          </Column>
        </Grid>
      </Section>
    </>
  );
};

export default SectionLanding;
