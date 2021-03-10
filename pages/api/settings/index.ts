import { Response } from 'express';
import Database from 'nedb';
import { MyRequest } from '../../../app/abstract/request';
import { Settings } from '../../../app/abstract/settings';
import { User } from '../../../app/abstract/user';

export const getSettings = async (req: MyRequest) => {
  const posts = (req.db.settings as Database<Settings>);
  const result = new Promise<Settings[]>((resolve) => {
    posts.findOne({}, ((error, post) => {
      if (error) throw error;
      if (!post) return resolve(null);

      const { _id, ...data } = post;

      return resolve([{
        id: _id,
        ...data,
      }]);
    }));
  });

  return result;
};

const handler = async (req: MyRequest, res: Response) => {
  const user = req.user as User;
  if (!user?.admin) {
    res.status(401).end();
    return;
  }

  if (req.method == 'GET') {
    // GET MANY POSTS METHOD

    const posts = await getSettings(req);

    res.setHeader('X-Total-Count', 1);
    res.status(200).json(posts);
  }
};

export default handler;
