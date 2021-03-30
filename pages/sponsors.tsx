import React, { useContext, useMemo } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

import { Settings } from '../app/abstract/settings';
import IntContext from '../app/context/Internalization';
import { MyRequest } from '../app/abstract/request';
import { getSettings } from './api/settings/[pid]';
import { Fronty, Basis, Utils } from '../app/components';
import { Typography } from '../app/components/basis';

const {
  Header,
  Footer,
  Title,
  Section,
  Background,
} = Fronty;

const {
  Container,
  Square,
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
      delay: 0.4,
    },
  },
  initial: {
    y: -70,
    opacity: 0,
  },
};

type SponsorLinkProps = { sponsor: any, style?: any, styleAnchor?: any };

export const SponsorLink = ({ sponsor, style, styleAnchor }: SponsorLinkProps) => (
  <MotionInView
    variants={variants}
    initial="initial"
    startAnimation="visible"
  >
    <Link href={sponsor.url} passHref>
      <a
        css={(theme) => (css`
          display: block;
          filter: grayscale(1);
          transition: ${theme.transitions.button(0.4)};
          
          &:hover {
            filter: grayscale(0);
            transform: scale(0.95);
            background-color: rgba(0, 0, 0, 0.1);
          }

          &:active {
            transform: scale(0.9);
            background-color: rgba(0, 0, 0, 0.2);
          }

          ${styleAnchor}
        `)}
      >
        <Square
          css={css`
            background: no-repeat center url(${sponsor.image});
            background-size: 60% auto;

            ${style}
          `}
        />
      </a>
    </Link>
  </MotionInView>
);

const Page: NextPage<PageProps> = ({ settings }) => {
  const i18n = useContext(IntContext);
  const locale = i18n.locale();

  const mainSponsors = useMemo(() => settings.sponsors.list.filter((sponsor) => sponsor.main), []);
  const partnerSponsors = useMemo(() => settings.sponsors.list.filter((sponsor) => (
    sponsor.partner
  )), []);
  const etcSponsors = useMemo(() => settings.sponsors.list.filter((sponsor) => (
    !sponsor.main && !sponsor.partner
  )), []);

  return (
    <>
      <Head>
        <title>{`${settings.site.title['ru-RU']} | ${i18n.t('head.title.sponsors')}`}</title>
        <Meta
          title={`${settings.site.title['ru-RU']} | ${i18n.t('head.title.sponsors')}`}
          description={i18n.t('pages.sponsors.description')}
          locale={locale}
          image={settings.sponsors.landingImage.image}
          url={new URL('/sponsors', settings.site.url).toString()}
          icon={settings.site.icon}
          type="website"
        />
      </Head>
      <Header navigationLinks={settings.navigationLinks} />
      <Title>{i18n.t('pages.sponsors.title_page')}</Title>
      <main>
        <Section>
          <Container css={{ padding: '200px 0' }}>
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
                {i18n.t('pages.sponsors.title_sponsors')}
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
                {i18n.t('pages.sponsors.description_sponsors')}
              </Typography>
            </MotionInView>
            <Grid
              css={css`
                margin: 100px auto;
              `}
              cols={3}
              colsXl={2}
              colsMd={1}
            >
              {
                settings.sponsors.mainImage?.url && (
                  <Column size={3} sizeXl={2} sizeMd={1}>
                    <SponsorLink
                      sponsor={settings.sponsors.mainImage}
                      style={css`
                        background-size: cover;

                        &:before {
                          padding-bottom: 35%;
                        }
                      `}
                      styleAnchor={css`
                        filter: grayscale(0);
                      `}
                    />
                  </Column>
                )
              }
              {mainSponsors.map((sponsor) => (
                <Column key={sponsor.image}>
                  <SponsorLink sponsor={sponsor} />
                </Column>
              ))}
            </Grid>
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
                {i18n.t('pages.sponsors.title_partners')}
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
                {i18n.t('pages.sponsors.description_partners')}
              </Typography>
            </MotionInView>
            <Grid
              css={css`
                margin: 100px auto;
              `}
              cols={3}
              colsXl={2}
              colsMd={1}
            >
              {partnerSponsors.map((sponsor) => (
                <Column key={sponsor.image}>
                  <SponsorLink sponsor={sponsor} />
                </Column>
              ))}
            </Grid>
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
                {i18n.t('pages.sponsors.title_smi')}
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
                {i18n.t('pages.sponsors.description_smi')}
              </Typography>
            </MotionInView>
            <Grid
              css={css`
                margin: 100px auto;
              `}
              cols={3}
              colsXl={2}
              colsMd={1}
            >
              {etcSponsors.map((sponsor) => (
                <Column key={sponsor.image}>
                  <SponsorLink sponsor={sponsor} />
                </Column>
              ))}
            </Grid>
          </Container>
          <Background />
        </Section>
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
