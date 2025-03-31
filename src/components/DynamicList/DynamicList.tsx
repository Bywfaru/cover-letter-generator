'use client';

import clsx from 'clsx';
import { Plus, Trash } from 'lucide-react';
import type { FC } from 'react';

export type DynamicListProps = {
  items: string[];
  label?: string;
  onChange?: (newList: string[]) => void;
  fullWidth?: boolean;
  description?: string
}

export const DynamicList: FC<DynamicListProps> = ({
  description,
  onChange,
  items,
  label,
  fullWidth,
}) => {
  const handleAddClick = () => {
    const newList = [...items, ''];

    onChange?.(newList);
  };

  const handleItemChange = (index: number, value: string) => {
    const newList = [...items];
    newList[index] = value;

    onChange?.(newList);
  };

  const handleItemRemove = (index: number) => {
    const newList = [...items];
    newList.splice(index, 1);

    onChange?.(newList);
  };

  return (
    <div className={clsx(['flex', 'flex-col', 'gap-1'])}>
      <label
        className={clsx([
          'flex',
          'flex-col',
          'gap-1',
          fullWidth ? 'w-full' : 'w-fit',
        ])}
      >
        {label && <span>{label}</span>}

        <div
          className={clsx([
            'flex',
            'flex-col',
            'gap-[2px]',
            fullWidth ? 'w-full' : 'w-fit',
          ])}
        >
          <ul
            className={clsx([
              'flex',
              'flex-col',
              'gap-[2px]',
              fullWidth ? 'w-full' : 'w-fit',
            ])}
          >
            {items.map((item, index) => (
              <li
                key={index}
                className={clsx([
                  'flex',
                  'justify-between',
                  'items-center',
                  'py-[6.5px]',
                  'px-2.5',
                  'border',
                  'border-border-primary',
                  'bg-background-secondary',
                  fullWidth ? 'w-full' : 'w-fit',
                ])}
              >
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  className={clsx(['border-none', 'bg-transparent', 'w-full'])}
                />

                <button
                  type="button"
                  className={clsx([
                    'group',
                    'p-2',
                    'rounded-full',
                    'hover:bg-red-500',
                    'transition-colors',
                    'cursor-pointer',
                  ])}
                  onClick={() => handleItemRemove(index)}
                >
                  <Trash
                    size={15}
                    className={clsx([
                      'text-red-500',
                      'group-hover:text-white',
                      'transition-colors',
                    ])}
                  />
                </button>
              </li>
            ))}
          </ul>

          <button
            className={clsx([
              'flex',
              'justify-center',
              'items-center',
              'gap-1',
              'py-2.5',
              'px-1',
              'border',
              'border-border-primary',
              'bg-transparent',
              'cursor-pointer',
              'hover:bg-white',
              'hover:border-white',
              'hover:text-background-primary',
              'transition-colors',
            ])} type="button" onClick={handleAddClick}
          >
            <span>Add</span>
            <Plus size={15} />
          </button>
        </div>
      </label>

      {description && (
        <p className="text-xs">{description}</p>
      )}
    </div>
  );
};