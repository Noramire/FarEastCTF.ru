import React, {
  HTMLAttributes,
  useContext,
  useMemo,
  useState,
} from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { css, useTheme } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';
import IntContext from '../../app/context/Internalization';
import { Fronty, Basis, Utils } from '../../app/components';
import { getPosts } from '../api/posts';
import { Post } from '../../app/abstract/post';
import { Settings } from '../../app/abstract/settings';
import { MyRequest } from '../../app/abstract/request';
import { getSettings } from '../api/settings/[pid]';

const {
  Header,
  Footer,
  Title,
  Section,
} = Fronty;

const {
  Container,
  Button,
  Card,
  Linkp,
  Grid,
  Column,
  Meta,
} = Basis;

const { MotionInView } = Utils;

type PageProps = {
  posts: Post[],
  settings: Settings,
};

type PostCardProps = HTMLAttributes<HTMLDivElement> & {
  title: string,
  description?: string,
  thumbnail?: string,
  link?: string,
  linkUrl?: string,
  date: number,
  thumbnailHeight?: string,
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

const getDate = (date: Date, locale: string) => (
  `${date.getDate()} ${date.toLocaleString(locale, { month: 'short' })} ${date.getFullYear()}`
);

export const PostCard = ({
  title,
  description,
  thumbnail,
  thumbnailHeight = '250px',
  link,
  linkUrl,
  date,
}: PostCardProps) => {
  const { colors } = useTheme();
  const i18n = useContext(IntContext);
  const locale = i18n.locale();

  return (
    <Card
      css={css`
        position: relative;
        color: ${colors.dark}
      `}
      thumbnail={thumbnail}
      thumbnailHeight={thumbnailHeight}
    >
      <span css={css`
          position: absolute;
          top: calc(${thumbnailHeight} - 10px);
          right: -20px;
          font-size: 15px;
          transform: rotate(90deg);
          transform-origin: right;
          font-family: 'RalewayBold';
        `}
      >
        {getDate(new Date(date), locale)}
      </span>
      <h2
        css={css`
          font-family: 'RalewayBlack';
          font-size: 25px;
          margin-bottom: 15px;
        `}
      >
        {title}
      </h2>
      <p css={css`
          font-size: 16px;
          margin-bottom: 14px;
        `}
      >
        {description}
      </p>
      <Linkp href={linkUrl}>{link}</Linkp>
    </Card>
  );
};

const Page: NextPage<PageProps> = ({ posts, settings }) => {
  const i18n = useContext(IntContext);
  const locale = i18n.locale();
  const { postsPerPage } = settings.posts;

  const [newPosts, setNewPosts] = useState<{ posts: Post[] }>({ posts: [] });
  const [page, setPage] = useState(1);
  const [newPostsExist, setNewPostsExist] = useState(true);

  const allPosts = useMemo(() => (
    [...posts.slice(4, posts.length), ...newPosts.posts]
  ), [newPosts]);

  return (
    <>
      <Head>
        <title>{`${settings.site.title['ru-RU']} | ${i18n.t('head.title.posts')}`}</title>
        <Meta
          title={`${settings.site.title['ru-RU']} | ${i18n.t('head.title.posts')}`}
          description={i18n.t('pages.blog.description')}
          locale={locale}
          image={posts[0].thumbnail}
          url={new URL('posts', settings.site.url).toString()}
          icon={settings.site.icon}
          type="website"
        />
      </Head>
      <Header navigationLinks={settings.navigationLinks} />
      <main>
        <Title description={i18n.t('pages.blog.description')}>{i18n.t('pages.blog.title')}</Title>
        <Section css={{ padding: '100px 0' }}>
          <Container>
            <Grid cols={2}>
              {posts.slice(0, 4).map((post) => (
                <Column key={post.id}>
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
                      date={post.date}
                      title={post.title[locale]}
                      description={post.description[locale]}
                      link={i18n.t('pages.blog.next')}
                      linkUrl={`/posts/${encodeURIComponent(post.slug)}`}
                      thumbnail={post.thumbnail}
                    />
                  </MotionInView>
                </Column>
              ))}
            </Grid>
            <Grid cols={3}>
              {allPosts.map((post) => (
                <Column key={post.id}>
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
                      date={post.date}
                      title={post.title[locale]}
                      description={post.description[locale]}
                      link={i18n.t('pages.blog.next')}
                      linkUrl={`/posts/${encodeURIComponent(post.slug)}`}
                      thumbnail={post.thumbnail}
                      thumbnailHeight="400px"
                    />
                  </MotionInView>
                </Column>
              ))}
            </Grid>
            <div css={css`text-align: center;`}>
              <AnimatePresence>
                {
                  newPostsExist
                    ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Button
                          onClick={async () => {
                            const response = await fetch(`/api/posts?_start=${page * postsPerPage}&_end=${page * postsPerPage + postsPerPage}`);
                            const fetchedPosts = await response.json();

                            if (fetchedPosts.length == 0) {
                              setNewPostsExist(false);
                              return;
                            }

                            setNewPosts((oldPosts) => (
                              { posts: [...oldPosts.posts, ...fetchedPosts] }
                            ));
                            setPage((oldPage) => (oldPage + 1));
                          }}
                        >
                          {i18n.t('pages.blog.load_more')}
                        </Button>
                      </motion.div>
                    )
                    : (
                      <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {i18n.t('pages.blog.no_more_posts')}
                      </motion.h2>
                    )
                }
              </AnimatePresence>
            </div>
          </Container>
        </Section>
      </main>
      <Footer navigationLinks={settings.navigationLinks} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const dbReq = req as MyRequest;
  const settings = await getSettings(dbReq);

  const props: PageProps = {
    posts: await getPosts(dbReq as any, { _end: settings.posts.postsPerPage }),
    settings,
  };

  return ({ props });
};

export default Page;
