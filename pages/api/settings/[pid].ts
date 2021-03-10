import { Response } from 'express';
import Database from 'nedb';
import { MyRequest } from '../../../app/abstract/request';
import { Settings } from '../../../app/abstract/settings';
import { User } from '../../../app/abstract/user';

export const getSettings = async (req: MyRequest) => {
  const posts = (req.db.settings as Database<Settings>);
  const result = new Promise<Settings>((resolve) => {
    posts
      .findOne({}, (error, post) => {
        if (error) throw error;
        if (!post) return resolve(null);

        const { _id, ...data } = post;

        return resolve({
          id: _id,
          ...data,
        });
      });
  });

  return result;
};

export const updateSettings = async (req: MyRequest, pid: string) => {
  const { _id, ...data } = req.body;

  const posts = (req.db.settings as Database<Settings>);
  const result = new Promise<Settings>((resolve) => {
    posts
      .update({ _id: pid }, { $set: data }, {
        upsert: false,
        returnUpdatedDocs: true,
      }, (error, _, post, b) => {
        if (error) throw error;
        if (!post) return resolve(null);

        // eslint-disable-next-line no-shadow
        const { _id, ...data } = post;

        return resolve({
          id: _id,
          ...data,
        });
      });
  });

  return result;
};

const handler = async (req: MyRequest, res: Response) => {
  const {
    query: { pid },
  } = req;
  const user = req.user as User;
  if (!user?.admin) {
    res.status(401).end();
    return;
  }

  if (req.method == 'GET') {
    // GET ONE POST METHOD

    const post = await getSettings(req);
    if (!post) {
      res.status(404).json({ id: null });
      return;
    }

    res.status(200).json(post);
  } else if (req.method == 'PUT') {
    const updatedPosts = await updateSettings(req, pid as string);

    res.status(200).json(updatedPosts);
  }
};

export default handler;
