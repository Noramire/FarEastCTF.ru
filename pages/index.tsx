import React, { useContext } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import { Post } from '../app/abstract/post';
import { Settings } from '../app/abstract/settings';
import IntContext from '../app/context/Internalization';
import {
  Basis,
  Fronty,
  Sections,
} from '../app/components';
import { settings } from '../utils/settings';
import { slides } from '../utils/slides';

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

const Page: NextPage<PageProps> = () => {
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
          image=""
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

export default Page;
