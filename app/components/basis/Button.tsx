import React, { AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement | HTMLButtonElement> & {
  primaryColor?: string,
  primaryTextColor?: string,
  secondaryColor?: string,
  secondaryTextColor?: string,
  pressedColor?: string,
  pressedTextColor?: string,
  buttonLine?: boolean,
};

const Button = ({
  children,
  primaryColor,
  primaryTextColor,
  secondaryColor,
  secondaryTextColor,
  pressedColor,
  pressedTextColor,
  href,
  buttonLine = true,
  ...props
}: ButtonProps) => {
  const { transitions, colors } = useTheme();

  const Line = styled.span(`
    margin-left: 20px;
    height: 1px;
    width: 20px;
    background: ${primaryTextColor ?? colors.light};
    transition: ${transitions.button()}
  `);

  const anchor = (
    <a
      css={css`
        background: ${primaryColor ?? colors.dark};
        color: ${primaryTextColor ?? colors.light};
        text-decoration: none;
        display: inline-block;
        transition: ${transitions.button(0.4)};
        cursor: pointer;
        padding: 25px 50px;
        user-select: none;

        &:hover {
          background: ${secondaryColor ?? colors.gray800};
          color: ${secondaryTextColor ?? colors.light};

          ${Line} {
            transform: rotate(90deg);
          }
        }

        &:active {
          background: ${pressedColor ?? colors.gray900};
          color: ${pressedTextColor ?? colors.light};
        }
      `}
      {...props}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-items: center;
        `}
      >
        {children}
        {buttonLine && (
          <Line />
        )}
      </div>
    </a>
  );

  return (
    href
      ? (
        <Link href={href} passHref>
          {anchor}
        </Link>
      )
      : anchor
  );
};

export default Button;
