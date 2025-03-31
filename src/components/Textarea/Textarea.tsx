'use client';

import clsx from 'clsx';
import type { DetailedHTMLProps, FC, TextareaHTMLAttributes } from 'react';

export type TextareaProps =
  {
    label?: string;
    fullWidth?: boolean;
    description?: string;
  }
  & DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

export const Textarea: FC<TextareaProps> = ({
  label,
  fullWidth,
  required,
  description,
  rows = 5,
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

        <textarea
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
          rows={rows}
        />
      </label>

      {description && (
        <p className="text-xs">{description}</p>
      )}
    </div>
  );
};