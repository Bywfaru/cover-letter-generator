'use client';

import clsx from 'clsx';
import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

export type ButtonProps =
  {
    fullWidth?: boolean;
  }
  & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
  fullWidth,
  className,
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      className={clsx([
        className,
        fullWidth ? 'w-full' : 'w-fit',
        'bg-white',
        'border',
        'border-white',
        'text-background-primary',
        'py-2.5',
        'px-5',
        'cursor-pointer',
        'hover:bg-transparent',
        'hover:text-white',
        'transition-colors',
      ])}
    />
  );
};

