import React, { HTMLAttributes } from 'react';
import {
  css,
  useTheme,
} from '@emotion/react';

type ColumnProps = HTMLAttributes<HTMLDivElement> & {
  size?: number,
  sizeXl?: number,
  sizeMd?: number,
  sizeSm?: number,
};

const Column = ({
  size = 1,
  sizeXl,
  sizeMd,
  sizeSm,
  children,
  ...props
}: ColumnProps) => {
  const { mediaQueries } = useTheme();

  return (
    <div
      css={css`
        grid-column: span ${size};

        ${sizeXl && (mediaQueries.xl(`grid-column: span ${sizeXl};`))}
        ${sizeMd && (mediaQueries.md(`grid-column: span ${sizeMd};`))}
        ${sizeSm && (mediaQueries.sm(`grid-column: span ${sizeSm};`))}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Column;
