import { CoverLetterForm } from '@/forms';
import clsx from 'clsx';
import type { FC } from 'react';

const HomePage: FC = () => {

  return (
    <main
      className={clsx([
        'w-full',
        'px-5',
        'py-10',
        'flex',
        'flex-col',
        'gap-10',
        'max-w-2xl',
        'mx-auto',
      ])}
    >
      <h1 className={clsx(['text-[2.5rem]'])}>Cover Letter Generator</h1>

      <p>
        An AI cover letter generator because, of course, everything needs to be
        AI.
      </p>

      <CoverLetterForm />
    </main>
  );
};

export default HomePage;