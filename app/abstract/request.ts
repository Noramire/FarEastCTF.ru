import { IncomingMessage } from 'http';
import { Settings } from 'http2';
import { Request } from 'express';
import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils';
import { PassportStatic } from 'passport';
import Database from 'nedb';
import { DatabasePost } from './post';
import { DatabaseUser } from './user';

type MyRequest = Request & IncomingMessage & {
  cookies: NextApiRequestCookies;
} & {
  db: {
    posts: Database<DatabasePost>
    settings: Database<Settings>
    user: Database<DatabaseUser>
  },
  passport: PassportStatic,
}

export type { MyRequest };
