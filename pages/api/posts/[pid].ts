import { Response } from 'express';
import Database from 'nedb';
import { DatabasePost, Post } from '../../../app/abstract/post';
import { MyRequest } from '../../../app/abstract/request';
import { User } from '../../../app/abstract/user';

export const getPost = async (req: MyRequest, pid: string) => {
  const posts = (req.db.posts as Database<DatabasePost>);
  const result = new Promise<Post>((resolve) => {
    posts
      .findOne({ _id: pid }, (error, post) => {
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

export const getPostBySlug = async (req: MyRequest, pid: string) => {
  const posts = (req.db.posts as Database<DatabasePost>);
  const result = new Promise<Post>((resolve) => {
    posts
      .findOne({ slug: pid }, (error, post) => {
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

export const deletePost = async (req: MyRequest, pid: string) => {
  const posts = ((req as any).db.posts as Database<DatabasePost>);
  const result = new Promise<number>((resolve) => {
    posts
      .remove({ _id: pid }, (error, n) => {
        if (error) throw error;

        resolve(n);
      });
  });

  return result;
};

export const updatePost = async (req: MyRequest, pid: string) => {
  const { _id, ...data } = req.body;

  const posts = ((req as any).db.posts as Database<DatabasePost>);
  const result = new Promise<Post>((resolve) => {
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

  if (req.method == 'GET') {
    // GET ONE POST METHOD

    const post = await getPost(req, pid as string);
    if (!post) {
      res.status(404).json({ id: null });
      return;
    }

    res.status(200).json(post);
  } else if (req.method == 'PUT') {
    if (!user?.admin) res.status(401).end();
    const updatedPosts = await updatePost(req, pid as string);

    res.status(200).json(updatedPosts);
  } else if (req.method == 'DELETE') {
    if (!user?.admin) res.status(401).end();
    const deletedPosts = await deletePost(req, pid as string);

    res.status(200).json(deletedPosts);
  }
};

export default handler;
