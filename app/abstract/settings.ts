type LocaleString = {
  'ru-RU': string,
  'en-US': string,
};

type Settings = Partial<{
  _id?: string,
  id?: string,
  site: {
    title: LocaleString,
    description: LocaleString,
    url: string,
  },
  posts: {
    postsPerPage: number,
  },
  about: {
    landingImage: {
      image: string,
    },
    images: {
      title: LocaleString,
      image: string,
    }[],
  },
  navigationLinks: {
    title: LocaleString,
    url: string,
  }[],
  slides: { id: string }[],
  email: string,
  socials: {
    title: LocaleString,
    url: string,
  }[],
  sponsors: {
    list: {
      title: LocaleString,
      image: string,
      url: string,
      main?: boolean,
    }[],
    landingImage: {
      image: string,
    },
    mainImage: {
      image: string,
      url: string,
    },
  }
}>;

export type { Settings, LocaleString };
