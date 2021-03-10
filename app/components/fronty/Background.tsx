import React, { HTMLAttributes } from 'react';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import Grid from '../basis/Grid';
import Column from '../basis/Column';

type BackgroundProps = HTMLAttributes<HTMLDivElement>;

const BackgroundColumn = styled(Column)`
  border-right: 1px solid ${({ theme: { colors } }) => (colors.border)};
`;

const Background = ({
  ...props
}: BackgroundProps) => {
  const { mediaQueries } = useTheme();

  return (
    <Grid
      {...props}
      css={css`
        position: absolute;
        top: 0; left: 0;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: -99;

        ${mediaQueries.xl(`
          grid-template-columns: 1fr 1fr;
          max-width: 100%;
        `)}

        ${mediaQueries.md(`
          grid-template-columns: 1fr 1fr;
        `)}
      `}
    >
      <BackgroundColumn />
      <BackgroundColumn />
      <BackgroundColumn />
      <BackgroundColumn />
    </Grid>
  );
};

export default Background;
