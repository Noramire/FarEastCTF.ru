import React, { HTMLAttributes } from 'react';
import { css } from '@emotion/react';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  styleImage?: any,
  thumbnail?: string,
  thumbnailHeight?: string,
};

const Card = ({
  thumbnail,
  thumbnailHeight = '250px',
  children,
  styleImage,
  ...props
}: CardProps) => (
  <div {...props}>
    <div css={css`
      background: no-repeat center url(${thumbnail});
      background-size: cover;
      width: 100%;
      height: ${thumbnailHeight};
      margin-bottom: 20px;

      ${styleImage}
    `}
    />
    <div>
      {children}
    </div>
  </div>
);

export default Card;
