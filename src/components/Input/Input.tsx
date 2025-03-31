'use client';

import clsx from 'clsx';
import type { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

export type InputProps = {
  label?: string;
  fullWidth?: boolean;
  description?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input: FC<InputProps> = ({
  label,
  fullWidth,
  required,
  description,
  ...restProps
}) => {
  return (
    <div className={clsx(['flex', 'flex-col', 'gap-1'])}>
      <label
        className={clsx([
          fullWidth ? 'w-full' : 'w-fit',
          'flex',
          'flex-col',
          'gap-1',
        ])}
      >
        {label && <span>{label}{required && '*'}</span>}

        <input
          {...restProps}
          className={clsx([
            fullWidth ? 'w-full' : 'w-fit',
            'bg-transparent',
            'border',
            'border-white',
            'text-white',
            'placeholder:white/50',
            'p-2.5',
          ])}
          required={required}
        />

      </label>

      {description && (
        <p className="text-xs">{description}</p>
      )}
    </div>
  );
};