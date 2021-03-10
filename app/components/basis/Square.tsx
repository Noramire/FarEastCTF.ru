import React, { HTMLAttributes } from 'react';
import { css } from '@emotion/react';

type SquareProps = HTMLAttributes<HTMLDivElement>;

const Square = ({
  children,
  ...props
}: SquareProps) => (
  <div
    css={css`
      &::before {
        content: "";
        padding-bottom: 100%;
        display: inline-block;
        vertical-align: top;
      }
    `}
    {...props}
  >
    {children}
  </div>
);

export default Square;
