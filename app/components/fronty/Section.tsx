import React, { HTMLAttributes } from 'react';
import { css } from '@emotion/react';

export type SectionProps = HTMLAttributes<HTMLLIElement>;

const Section = ({
  children,
  ...props
}: SectionProps) => (
  <section
    css={css`
      position: relative;
    `}
    {...props}
  >
    {children}
  </section>
);

export default Section;
