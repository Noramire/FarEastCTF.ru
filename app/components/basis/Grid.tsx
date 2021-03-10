import React, { HTMLAttributes } from 'react';
import { css, useTheme } from '@emotion/react';

type GridProps = HTMLAttributes<HTMLDivElement> & {
  style?: any,
  cols?: number,
  colsXl?: number,
  colsMd?: number,
  colsSm?: number,
};

const Grid = ({
  children,
  cols = 5,
  colsXl = 2,
  colsMd = 1,
  colsSm = 1,
  style,
  ...props
}: GridProps) => {
  const { mediaQueries } = useTheme();

  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(${cols}, 1fr);
        width: 100%;
        margin: 0 auto;

        ${(mediaQueries.xl(`grid-template-columns: repeat(${colsXl}, 1fr);`))}
        ${(mediaQueries.md(`grid-template-columns: repeat(${colsMd}, 1fr);`))}
        ${(mediaQueries.sm(`grid-template-columns: repeat(${colsSm}, 1fr);`))}

        ${style}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Grid;
