import React, { useContext } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import { Post } from '../app/abstract/post';
import { Settings } from '../app/abstract/settings';
import IntContext from '../app/context/Internalization';
import { MyRequest } from '../app/abstract/request';
import { getSettings } from './api/settings/[pid]';
import {
  Basis,
  Fronty,
  Sections,
} from '../app/components';

const { Meta } = Basis;

const {
  Header,
  Footer,
} = Fronty;

const {
  SectionLanding,
  SectionAbout,
  SectionWriteUs,
  SectionSponsors,
} = Sections;

type PageProps = {
  slides: Post[],
  settings: Partial<Settings>,
};

const Page: NextPage<PageProps> = ({ settings, slides }) => {
  const i18n = useContext(IntContext);
  const locale = i18n.locale();

  return (
    <>
      <Head>
        <title>{`${settings.site.title['ru-RU']} | ${i18n.t('head.title.home')}`}</title>
        <Meta
          title={`${settings.site.title['ru-RU']} | ${i18n.t('head.title.home')}`}
          description={i18n.t('pages.home.description')}
          locale={locale}
          image={slides && slides[0].thumbnail}
          url={new URL('/', settings.site.url).toString()}
          icon={settings.site.icon}
          type="website"
        />
      </Head>
      <Header navigationLinks={settings.navigationLinks} />
      <main>
        <SectionLanding
          socials={settings.socials}
          slides={slides}
        />
        <SectionAbout landingImage={settings.about.landingImage} />
        <SectionSponsors
          sponsors={settings.sponsors.list}
          landingImage={settings.sponsors.landingImage}
        />
        <SectionWriteUs email={settings.email} />
      </main>
      <Footer navigationLinks={settings.navigationLinks} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const dbReq = req as MyRequest;
  const settings = await getSettings(dbReq);

  const slides = await new Promise<Post[]>((resolve) => (
    (dbReq.db.posts.find({ _id: { $in: settings.slides.map((v) => v.id) } }, (error, posts) => {
      if (error) throw error;

      const transformedPosts: Post[] = posts.map((post) => {
        const { _id, ...data } = post;

        return ({
          id: _id,
          ...data,
        });
      });

      resolve(transformedPosts);
    }))
  ));

  const props: PageProps = {
    slides,
    settings,
  };

  return ({ props });
};

export default Page;
