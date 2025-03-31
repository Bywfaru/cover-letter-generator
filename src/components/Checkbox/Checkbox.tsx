'use client';

import clsx from 'clsx';
import type { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

export type CheckboxProps =
  {
    label: string;
    description?: string;
  }
  & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'>

export const Checkbox: FC<CheckboxProps> = ({
  label,
  required,
  description,
  ...restProps
}) => {
  return (
    <div className={clsx(['flex', 'flex-col', 'gap-1'])}>
      <label
        className={clsx([
          'flex',
          'items-center',
          'gap-1',
          'w-fit',
          'cursor-pointer',
        ])}
      >
        <input
          type="checkbox"
          {...restProps}
          className={clsx([
            'bg-transparent',
            'border',
            'border-white',
            'text-white',
            'placeholder:white/50',
            'py-2.5',
            'px-1',
            'cursor-pointer',
          ])}
          required={required}
        />

        {label && <span>{label}{required && '*'}</span>}
      </label>

      {description && (
        <p className="text-xs">{description}</p>
      )}
    </div>
  );
};