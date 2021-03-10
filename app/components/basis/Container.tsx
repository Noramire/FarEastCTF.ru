import React, { HTMLAttributes } from 'react';
import { css, useTheme } from '@emotion/react';
import Column from './Column';
import Grid from './Grid';

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: number,
};

const Container = ({
  children,
  size = 3,
  ...props
}: ContainerProps) => {
  const { mediaQueries } = useTheme();

  return (
    <Grid
      css={css`
        ${mediaQueries.xl(`
          grid-template-columns: 1fr;
          max-width: 85%;
        `)}

        ${mediaQueries.md(`
          grid-template-columns: 1fr;
          max-width: 90%;
        `)}
      `}
      {...props}
    >
      <Column />
      <Column
        size={size}
      >
        {children}
      </Column>
    </Grid>
  );
};

export default Container;
