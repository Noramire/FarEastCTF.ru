type DatabaseUnit = {
  _id?: string,
}

type Post = Partial<{
  id: string,
  slug: string,
  title: {
    'ru-RU': string,
    'us-EN'?: string,
  },
  description: {
    'ru-RU': string,
    'us-EN'?: string,
  },
  content?: {
    'ru-RU'?: string,
    'us-EN'?: string,
  },
  date: number,
  thumbnail: string,
}>;

type DatabasePost = DatabaseUnit & Post & { id?: never };

export type {
  DatabaseUnit,
  DatabasePost,
  Post,
};
