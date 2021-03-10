import React, { HTMLAttributes } from 'react';
import { css, useTheme } from '@emotion/react';

type StatusProps = HTMLAttributes<HTMLDivElement>;

const Status = ({
  children,
  ...props
}: StatusProps) => {
  const { colors } = useTheme();

  return (
    <>
      <div
        {...props}
        css={css`
          display: flex;
        `}
      >
        <span
          css={css`
            display: block;
            align-self: center;
            line-height: 0;
            border-bottom: 1px solid ${colors.mono};
            width: 20px;
            height: 1px;
          `}
        />
        <span
          css={css`
            margin-left: 10px;
            text-transform: uppercase;
          `}
        >
          {children}
        </span>
      </div>
    </>
  );
};

export default Status;
