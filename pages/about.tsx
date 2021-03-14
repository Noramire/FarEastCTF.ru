import React, { useContext, useEffect, useRef } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { css, useTheme } from '@emotion/react';

import { Settings } from '../app/abstract/settings';
import IntContext from '../app/context/Internalization';
import { MyRequest } from '../app/abstract/request';
import { getSettings } from './api/settings/[pid]';
import {
  Fronty,
  Basis,
  Utils,
  Sections,
} from '../app/components';
import { Typography } from '../app/components/basis';

const {
  Header,
  Footer,
  Title,
  Background,
  Status,
  Section,
} = Fronty;

const { SectionWriteUs } = Sections;

const {
  Container,
  Grid,
  Column,
  Meta,
} = Basis;

const { MotionInView } = Utils;

type PageProps = {
  settings: Partial<Settings>,
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
      delay: 0.2,
    },
  },
  initial: {
    y: -70,
    opacity: 0,
  },
};

const Page: NextPage<PageProps> = ({ settings }) => {
  const i18n = useContext(IntContext);
  const locale = i18n.locale();
  const router = useRouter();
  const ref = useRef(null);

  const { colors, mediaQueries } = useTheme();

  useEffect(() => {
    if (typeof window != 'undefined'
      && ref?.current
      && router.asPath.match(/#gallery/)) {
      const timer = setTimeout(() => (window.scrollTo(0, ref.current.offsetTop)), 100);

      return (() => {
        clearTimeout(timer);
      });
    }

    return null;
  }, [ref, typeof window]);

  return (
    <>
      <Head>
        <title>{`${settings.site.title['ru-RU']} | ${i18n.t('head.title.about_us')}`}</title>
        <Meta
          title={`${settings.site.title['ru-RU']} | ${i18n.t('head.title.about_us')}`}
          description={i18n.t('pages.about.description')}
          locale={locale}
          image={settings.about.landingImage.image}
          url={new URL('/about', settings.site.url).toString()}
          icon={settings.site.icon}
          type="website"
        />
      </Head>
      <Header navigationLinks={settings.navigationLinks} />
      <Title>{i18n.t('pages.about_us.title_page')}</Title>
      <main>
        <Section css={{ padding: '100px 0' }}>
          <Container
            css={css`
              padding: 100px 0 200px;

              ${mediaQueries.xl(`
                padding: 0 0 100px;
              `)}
            `}
          >
            <MotionInView
              variants={variants}
              startAnimation="visible"
              initial="initial"
            >
              <Status css={{ marginBottom: 40 }}>{i18n.t('pages.about_us.status')}</Status>
            </MotionInView>
            <MotionInView
              variants={variants}
              startAnimation="visible"
              initial="initial"
            >
              <Typography
                as="h1"
                fontSize="40px"
                fontSizeXl="35px"
                fontFamily="RalewayBlack"
              >
                {i18n.t('pages.about_us.title')}
              </Typography>
            </MotionInView>
            <MotionInView
              variants={variants}
              initial="initial"
              startAnimation="visible"
            >
              <Typography
                as="p"
                fontSize="35px"
                fontSizeXl="25px"
              >
                {i18n.t('pages.about_us.description')}
              </Typography>
            </MotionInView>
          </Container>
          <div ref={ref}>
            <Grid>
              {
                settings.about.images?.map((image) => (
                  <Column
                    css={css`
                      height: 20vw;
                      grid-row: span 1;
                      grid-column: span 2;

                      ${mediaQueries.xl(`
                        height: 40vw !important;
                        grid-column: span 1 !important;
                        grid-row: span 1 !important;
                      `)}

                      &:nth-of-type(3n - 2) {
                        height: 40vw;
                        grid-row: span 2;
                        grid-column: span 3;
                      }
                  
                      &:nth-of-type(6n - 2) {
                        height: 20vw;
                        grid-row: span 1;
                        grid-column: span 2;
                      }
                  
                      &:nth-of-type(6n - 1) {
                        height: 40vw;
                        grid-row: span 2;
                        grid-column: span 3;
                      }
                  
                      &:nth-of-type(6n) {
                        height: 20vw;
                        grid-row: span 1;
                        grid-column: span 2;
                      }
                    `}
                    sizeMd={1}
                    key={image.image}
                  >
                    <MotionInView
                      variants={variants}
                      initial="initial"
                      startAnimation="visible"
                      css={css`
                        background: center no-repeat url(${image.image});
                        background-size: cover;
                        height: 100%;
                        width: 100%;
                      `}
                      whileHover={{
                        scale: 0.95,
                        transition: {
                          duration: 0.4,
                          ease: 'easeOut',
                        },
                      }}
                      whileTap={{
                        scale: 0.9,
                      }}
                    />
                  </Column>
                ))
              }
            </Grid>
          </div>
          <div
            css={css`
              background: ${colors.dark};
              color: ${colors.light};
            `}
          >
            <Container
              css={css`
                padding: 200px 0;

                ${mediaQueries.xl(`
                  padding: 100px 0;
                `)}
              `}
            >
              <MotionInView
                variants={variants}
                startAnimation="visible"
                initial="initial"
              >
                <Status css={{ marginBottom: 40 }}>{i18n.t('pages.about_us.b_status')}</Status>
              </MotionInView>
              <MotionInView
                variants={variants}
                startAnimation="visible"
                initial="initial"
              >
                <Typography
                  as="h1"
                  fontSize="40px"
                  fontSizeXl="35px"
                  fontFamily="RalewayBlack"
                >
                  {i18n.t('pages.about_us.b_title')}
                </Typography>
              </MotionInView>
              <MotionInView
                variants={variants}
                initial="initial"
                startAnimation="visible"
              >
                <Typography
                  as="p"
                  fontSize="35px"
                  fontSizeXl="25px"
                >
                  {i18n.t('pages.about_us.b_description')}
                </Typography>
              </MotionInView>
            </Container>
          </div>
          <Background />
        </Section>
        <SectionWriteUs
          email={settings.email}
          css={css`
            ${mediaQueries.xl(`
              padding: 0 0 100px;
            `)}
          `}
        />
      </main>
      <Footer navigationLinks={settings.navigationLinks} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const settings = await getSettings(req as MyRequest);

  const props: PageProps = {
    settings,
  };

  return ({ props });
};

export default Page;
