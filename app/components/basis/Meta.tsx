import React from 'react';

type MetaProps = {
  title: string,
  description: string,
  url: string,
  image: string,
  locale: string,
  type: 'website' | 'article' | 'profile',
  icon: string,
};

const Meta = ({
  title,
  description,
  url,
  image,
  locale,
  type = 'website',
  icon,
}: MetaProps) => (
  <>
    <link rel="shortcut icon" href={icon} />
    <meta name="title" content={title} />
    <meta name="description" content={description} />

    <meta property="og:type" content={type} />
    <meta property="og:url" content={url} />
    <meta property="og:locale" content={locale} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={url} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={image} />
  </>
);

export default Meta;
