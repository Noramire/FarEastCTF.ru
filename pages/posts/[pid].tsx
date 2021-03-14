import React, { useContext } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Error from 'next/error';
import { css, useTheme } from '@emotion/react';

import IntContext from '../../app/context/Internalization';
import { Post } from '../../app/abstract/post';
import { Fronty, Basis, Utils } from '../../app/components';
import { getPosts } from '../api/posts';
import { getPostBySlug } from '../api/posts/[pid]';
import { MyRequest } from '../../app/abstract/request';
import { Settings } from '../../app/abstract/settings';
import { getSettings } from '../api/settings/[pid]';
import { PostCard } from './index';
import { Typography } from '../../app/components/basis';

const {
  Header,
  Footer,
  Section,
} = Fronty;

const {
  Container,
  Grid,
  Column,
  Meta,
} = Basis;

const { MotionInView } = Utils;

type PageProps = {
  post: Post,
  posts: Post[],
  settings: Settings,
  error?: boolean,
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

const Page: NextPage<PageProps> = ({
  post,
  posts,
  settings,
  error,
}) => {
  if (error) return (<Error statusCode={404} />);

  const { colors } = useTheme();
  const i18n = useContext(IntContext);
  const locale = i18n.locale();

  const getDate = (date: Date) => `${date.getDate()} ${date.toLocaleString(locale, { month: 'short' })} ${date.getFullYear()}`;
  return (
    <>
      <Head>
        <title>{`${settings.site.title['ru-RU']} | ${post.title[locale]}`}</title>
        <Meta
          title={`${settings.site.title['ru-RU']} | ${post.title[locale]}`}
          description={post.description[locale]}
          locale={locale}
          image={post.thumbnail}
          url={new URL(`posts/${post.slug}`, settings.site.url).toString()}
          icon={settings.site.icon}
          type="article"
        />
      </Head>
      <Header navigationLinks={settings.navigationLinks} />
      <main>
        <div css={css`
            background: no-repeat center url(${post.thumbnail});
            background-size: cover;
            width: 100%;
            height: 80vh;
          `}
        />
        <Container size={3}>
          <header css={css`
              border-bottom: 1px solid ${colors.border};
              padding: 4rem 0;
            `}
          >
            <Typography
              as="h1"
              fontSize="40px"
              fontSizeXl="35px"
              fontFamily="RalewayBlack"
            >
              {post.title[locale]}
            </Typography>
            <Typography
              as="p"
              fontSize="20px"
            >
              {post.description[locale]}
            </Typography>
            <Typography
              as="p"
              fontSize="15px"
            >
              {getDate(new Date(post.date))}
            </Typography>
          </header>
          {post.content && post.content[locale] && (
            <div
              css={css`
                padding-top: 3rem;
                margin: 0;

                font-size: 18px;
                line-height: 2rem;

                ul {
                  margin: 0;
                  padding: 1rem 0 calc(1rem + 5px);
                }
                
                hr {
                  border: 1px solid ${colors.mono};
                  margin: 1rem 0 calc(1rem + 5px);
                }
                
                h1, h2, h3, h4, h5, h6 {
                  margin: 0;
                  padding: 1rem 0;
                  font-family: 'RalewayBold';
                }
                
                p {
                  padding: 1rem 0 calc(1rem + 5px);
                  margin: 0;
                }
                
                img {
                  width: 150%;
                  margin-left: -25%;
                }

                a {
                  color: ${colors.primary};
                }
              `}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: post.content[locale],
              }}
            />
          )}
        </Container>
      </main>
      <Section css={{ padding: '100px 0' }}>
        <Container>
          <Typography
            as="h1"
            fontSize="40px"
            fontSizeXl="35px"
            fontFamily="RalewayBlack"
          >
            {i18n.t('pages.post.more_posts')}
          </Typography>
          <Grid cols={2}>
            {posts.slice(0, 4).map((recentPost) => (
              <Column key={recentPost.id}>
                <MotionInView
                  css={css`
                    margin: 0 25px 80px;
                    position: relative;
                  `}
                  variants={variants}
                  initial="initial"
                  startAnimation="visible"
                >
                  <PostCard
                    date={recentPost.date}
                    title={recentPost.title[locale]}
                    description={recentPost.description[locale]}
                    link={i18n.t('pages.blog.next')}
                    linkUrl={`/posts/${encodeURIComponent(recentPost.slug)}`}
                    thumbnail={recentPost.thumbnail}
                  />
                </MotionInView>
              </Column>
            ))}
          </Grid>
        </Container>
      </Section>
      <Footer navigationLinks={settings.navigationLinks} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const {
    pid,
  } = query;

  const dbReq = req as MyRequest;
  const settings = await getSettings(dbReq);

  const post = await getPostBySlug(dbReq as any, pid as string);

  if (!post) {
    res.statusCode = 404;
    return ({ props: { error: true } });
  }

  const props: PageProps = {
    post,
    posts: (await getPosts(dbReq as any, { _end: 4 })),
    settings,
  };

  return ({ props });
};

export default Page;
