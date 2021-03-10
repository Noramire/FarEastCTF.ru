import express from 'express';
import { json, urlencoded } from 'body-parser';
import next from 'next';
import Database from 'nedb';
import session from 'express-session';
import passport from 'passport';
import PassportLocal from 'passport-local';
import NedbStoreInitialization from 'nedb-session-store';
import crypto from 'crypto';

import { DatabasePost } from '../abstract/post';
import { Settings } from '../abstract/settings';
import { DatabaseUser, User } from '../abstract/user';

const PORT = process.env.PORT ?? 3000;
const DEV_MODE = process.env.NODE_ENV !== 'production';
// TODO: set secret string from database
const SECRET = 'fareaaefswstmoectf_e2fsj23kl';

const NedbStore = NedbStoreInitialization(session);
const LocalStrategy = PassportLocal.Strategy;

const server = express();
const app = next({ dev: DEV_MODE });
const handle = app.getRequestHandler();
const db = {
  posts: new Database<DatabasePost>({ filename: 'database/posts.db' }),
  settings: new Database<Settings>({ filename: 'database/settings.db' }),
  users: new Database<DatabaseUser>({ filename: 'database/users.db' }),
};

/**
 * Here you can do any other back-end code that has not to act with server code below.
*/

export { db, app, server };

(async () => {
  /**
   * If you still need the async result of your code, you can write it here.
   * You can use Promise.all to execute all await code concurrently.
  */

  await Promise.all(
    Object.keys(db).map((key) => (
      new Promise<void>((resolve) => {
        db[key].loadDatabase(() => { resolve(); });
      })
    )),
  );
  await app.prepare();

  passport.use(new LocalStrategy((username, cleanPassword, done) => {
    const password = crypto.createHmac('sha256', SECRET).update(cleanPassword, 'utf-8').digest('hex');
    db.users.findOne({ username, password }, (error, user) => {
      if (error) { return done(error); }

      if (!user) {
        return done(null, false);
      }

      const { _id, ...data } = user;

      return done(null, {
        id: _id,
        ...data,
      });
    });
  }));

  passport.serializeUser((user, done) => {
    done(null, (user as User).id);
  });

  passport.deserializeUser((id, done) => {
    db.users.findOne({ _id: id }, (err, user) => {
      done(err, user);
    });
  });

  server.use(json({ limit: '10mb' }));
  server.use(urlencoded({ extended: true }));
  server.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 7 * 60 * 60 * 1000, // TODO: change this from month to something else
    },
    store: NedbStore({
      filename: 'database/session.db',
    }),
  }));
  server.use(passport.initialize());
  server.use(passport.session());

  server.use((req, _, then) => {
    (req as any).db = db;
    (req as any).passport = passport;

    then();
  });

  // TODO: transform into pages with req.login
  server.post('/login',
    passport.authenticate('local'),
    (req, res) => {
      const { password, ...data } = req.user as User;
      res.status(200).json(data);
    });

  server.get('/logout',
    (req, res) => {
      req.logout();
      res.status(200).redirect('/');
    });

  server.use((req, res) => handle(req, res));
  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${PORT}\nMODE: ${DEV_MODE ? 'development' : 'production'}`);
  });
})();
