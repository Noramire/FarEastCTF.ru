import React, { AnchorHTMLAttributes } from 'react';
import Link, { LinkProps } from 'next/link';
import { css, useTheme } from '@emotion/react';

type LinkpProps = AnchorHTMLAttributes<HTMLAnchorElement> & Partial<LinkProps> & {
  primaryColor?: string,
  secondaryColor?: string,
};

const Linkp = ({
  children,
  primaryColor,
  secondaryColor,
  href,
  locale,
  ...props
}: LinkpProps) => {
  const { transitions, colors } = useTheme();
  const anchor = (
    <a
      css={css`
        text-decoration: none;
        color: ${primaryColor ?? colors.primary};
        cursor: pointer;
        transition: color ${transitions.link()};

        &:hover {
          color: ${secondaryColor ?? colors.secondary};
        }
      `}
      {...props}
    >
      {children}
    </a>
  );

  return (
    href
      ? (
        <Link href={href} passHref locale={locale}>
          {anchor}
        </Link>
      )
      : anchor
  );
};

export default Linkp;
