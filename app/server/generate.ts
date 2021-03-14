import { db } from './main';

db.settings.findOne({}, (error, post) => {
  if (error) throw error;

  if (!post) {
    db.settings.insert({
      site: {
        title: { 'ru-RU': 'FarEastCTF', 'en-US': 'FarEastCTF' },
        description: { 'ru-RU': 'FarEastCTF', 'en-US': 'FarEastCTF' },
        url: process.env.NODE_HOST ?? 'http://localhost:3000', // 'http://localhost:3000'
        icon: '/icon.svg',
      },
      posts: {
        postsPerPage: 10,
      },
      about: {
        landingImage: {
          image: '/photos/image_9.png',
        },
        images: [
          { title: { 'ru-RU': 'ФОтография', 'en-US': 'Photo' }, image: '/photos/image_6.png' },
          { title: { 'ru-RU': 'ФОтография', 'en-US': 'Photo' }, image: '/photos/image_7.png' },
          { title: { 'ru-RU': 'ФОтография', 'en-US': 'Photo' }, image: '/photos/image_8.png' },
          { title: { 'ru-RU': 'ФОтография', 'en-US': 'Photo' }, image: '/photos/image_9.png' },
          { title: { 'ru-RU': 'ФОтография', 'en-US': 'Photo' }, image: '/photos/image_10.png' },
          { title: { 'ru-RU': 'ФОтография', 'en-US': 'Photo' }, image: '/photos/image_11.png' },
        ],
      },
      email: 'mail@fareastctf.ru',
      navigationLinks: [
        { title: { 'ru-RU': 'Главная', 'en-US': 'Home' }, url: '/' },
        { title: { 'ru-RU': 'О нас', 'en-US': 'About' }, url: '/about' },
        { title: { 'ru-RU': 'Спонсоры', 'en-US': 'Sponsors' }, url: '/sponsors' },
        { title: { 'ru-RU': 'Новости', 'en-US': 'News' }, url: '/posts' },
      ],
      slides: [{ id: '' }, { id: '' }],
      socials: [
        {
          title: { 'ru-RU': 'Телеграм', 'en-US': 'Telegram' },
          url: 'https://t.me/FarEastCTF',
        },
        {
          title: { 'ru-RU': 'ВКонтакте', 'en-US': 'VKontakte' },
          url: 'https://vk.com/fareastctf',
        },
        {
          title: { 'ru-RU': 'Инстаграм', 'en-US': 'Instagram' },
          url: 'https://www.instagram.com/fareastctf/',
        },
      ],
      sponsors: {
        list: [
          {
            title: { 'ru-RU': 'Спонсор', 'en-US': 'Sponsor' },
            image: '/sponsors/sponsor_1.png',
            main: true,
            url: '/',
          },
          {
            title: { 'ru-RU': 'Спонсор', 'en-US': 'Sponsor' },
            image: '/sponsors/sponsor_2.png',
            url: '/',
            main: true,
          },
          {
            title: { 'ru-RU': 'Спонсор', 'en-US': 'Sponsor' },
            image: '/sponsors/sponsor_3.png',
            url: '/',
          },
          {
            title: { 'ru-RU': 'Спонсор', 'en-US': 'Sponsor' },
            image: '/sponsors/sponsor_4.png',
            url: '/',
            main: true,
          },
          {
            title: { 'ru-RU': 'Спонсор', 'en-US': 'Sponsor' },
            image: '/sponsors/sponsor_5.png',
            url: '/',
          },
          {
            title: { 'ru-RU': 'Спонсор', 'en-US': 'Sponsor' },
            image: '/sponsors/sponsor_6.png',
            url: '/',
          },
          {
            title: { 'ru-RU': 'Спонсор', 'en-US': 'Sponsor' },
            image: '/sponsors/sponsor_7.png',
            url: '/',
          },
          {
            title: { 'ru-RU': 'Спонсор', 'en-US': 'Sponsor' },
            image: '/sponsors/sponsor_8.png',
            url: '/',
          },
        ],
        mainImage: {
          image: '/sponsors/rostelecom_main.png',
          url: '/',
        },
        landingImage: {
          image: '/sponsors/Rostelekom_2.jpg',
        },
      },
    });
  }
});

db.users.findOne({ username: 'admin' }, ((error, user) => {
  if (!user) {
    db.users.insert({
      admin: true,
      username: 'admin',
      password: '31fcf07f65bbc0a50d9c170690b3b0ba9449a439df7fa8b0b233b0b10b030f8b', // adjpwie21efklms
    });
  }
}));
