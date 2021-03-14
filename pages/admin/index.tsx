import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import jsonServerProvider from 'ra-data-json-server';
import dynamic from 'next/dynamic';
import { Resource } from 'react-admin';

import { Settings } from '../../app/abstract/settings';
import { MyRequest } from '../../app/abstract/request';
import { AuthProvider, PostForms, SettingsForms } from '../../app/components/admin';

const { PostEdit, PostCreate, PostList } = PostForms;
const { SettingsEdit, SettingsList } = SettingsForms;

const Admin = dynamic(() => import('react-admin').then((module) => module.Admin), { ssr: false });

type PageProps = {
  settings: Partial<Settings>,
};

const Page: NextPage<PageProps> = ({ settings }) => {
  const dataProvider = jsonServerProvider(new URL('/api', settings.site.url));

  return (
    <>
      <Head>
        <title>{`${settings.site.title['ru-RU']} | Admin Panel`}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Admin dataProvider={dataProvider} authProvider={AuthProvider}>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} />
        <Resource name="settings" list={SettingsList} edit={SettingsEdit} />
      </Admin>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const dbReq = req as MyRequest;

  const settings = await new Promise<Settings>((resolve) => (
    (dbReq.db.settings.findOne({}, (error, s) => {
      if (error) throw error;

      resolve(s as Settings);
    }))
  ));

  const props: PageProps = {
    settings,
  };

  return ({ props });
};

export default Page;
