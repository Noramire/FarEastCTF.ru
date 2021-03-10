import { Response } from 'express';
import Database from 'nedb';
import { DatabasePost, Post } from '../../../app/abstract/post';
import { MyRequest } from '../../../app/abstract/request';
import { User } from '../../../app/abstract/user';

export const getPosts = async (req: MyRequest, q?: Record<string, any>) => {
  const {
    _sort = 'date',
    _order = 'DESC',
    _start = '0',
    _end = '10',
  } = {
    ...req.query,
    ...q,
  };

  const posts = (req.db.posts as Database<DatabasePost>);
  const result = new Promise<Post[]>((resolve) => {
    let query = posts.find({})
      .sort({ [_sort as string]: _order == 'DESC' ? -1 : 1 })
      .skip(parseInt(_start as string, 10));
    const _endInt = parseInt(_end as string, 10);
    if (_end && (_endInt > 0)) query = query.limit(_endInt);

    query.exec((error, p) => {
      if (error) throw error;

      const transformedPosts: Post[] = p.map((post) => {
        const { _id, ...data } = post;

        return ({
          id: _id,
          ...data,
        });
      });

      resolve(transformedPosts);
    });
  });

  return result;
};

export const countPosts = async (req: MyRequest) => (
  new Promise<number>((resolve) => (
    req.db.posts.count({}, (error, n) => resolve(n))
  ))
);

export const createPost = async (req: MyRequest) => {
  const { _id, ...data } = req.body;

  const currentDate = new Date().getTime();

  const posts = ((req as any).db.posts as Database<DatabasePost>);
  const result = new Promise<Post>((resolve) => {
    posts
      .insert({ ...data, date: currentDate }, (error, post) => {
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
  const user = req.user as User;

  if (req.method == 'GET') {
    // GET MANY POSTS METHOD

    const posts = await getPosts(req);

    res.setHeader('X-Total-Count', await countPosts(req));
    res.status(200).json(posts);
  } else if (req.method == 'POST') {
    if (!user?.admin) res.status(401).end();
    // CREATE ONE POST METHOD

    const post = await createPost(req);

    res.status(200).json(post);
  }
};

export default handler;
