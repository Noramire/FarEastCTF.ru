import React, { HTMLAttributes } from 'react';
import { css, useTheme } from '@emotion/react';

type ListProps = HTMLAttributes<HTMLUListElement>;

const List = ({
  children,
  ...props
}: ListProps) => {
  const { mediaQueries } = useTheme();

  return (
    <ul
      css={css`
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;

        ${mediaQueries.md(`
          flex-direction: column;
        `)}
      `}
      {...props}
    >
      {children}
    </ul>
  );
};

export default List;
