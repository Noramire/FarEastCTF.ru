import React, { HTMLAttributes } from 'react';
import { css, useTheme } from '@emotion/react';

type TypographyProps = HTMLAttributes<HTMLElement> & {
  as: string,
  fontFamily?: string;
  fontWeight?: string;
  fontSize?: string;
  fontSizeLg?: string;
  fontSizeXl?: string;
  fontSizeMd?: string;
  fontSizeSm?: string;
};

const Typography = ({
  children,
  as,
  fontFamily,
  fontWeight,
  fontSize,
  fontSizeLg,
  fontSizeXl,
  fontSizeMd,
  fontSizeSm,
  ...props
}: TypographyProps) => {
  const Tag = as as any;
  const { mediaQueries } = useTheme();

  return (
    <Tag
      css={css`
        font-size: ${fontSize};
        font-family: ${fontFamily};
        font-weight: ${fontWeight};

        ${fontSizeLg && mediaQueries.lg(`
          font-size: ${fontSizeLg};
        `)}
        ${fontSizeXl && mediaQueries.xl(`
          font-size: ${fontSizeXl};
        `)}
        ${fontSizeMd && mediaQueries.md(`
          font-size: ${fontSizeMd};
        `)}
        ${fontSizeSm && mediaQueries.sm(`
          font-size: ${fontSizeSm};
        `)}
      `}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Typography;
