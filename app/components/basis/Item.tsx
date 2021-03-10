import React, { HTMLAttributes } from 'react';

type ItemProps = HTMLAttributes<HTMLLIElement>;

const Item = ({
  children,
  ...props
}: ItemProps) => (
  <li {...props}>
    {children}
  </li>
);

export default Item;
