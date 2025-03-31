'use client';

import { Button, Checkbox, DynamicList, Input, Textarea } from '@/components';
import { useChat } from '@ai-sdk/react';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { type FC, useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useLocalStorage } from 'usehooks-ts';
import { z } from 'zod';

export const COVER_LETTER_FORM_SCHEMA = z.object({
  employer: z.string(),
  hiringManager: z.string().optional(),
  name: z.string(),
  role: z.string(),
  jobDescription: z.string(),
  workExperience: z.string(),
  education: z.string(),
  additionalNotes: z.string().optional(),
  skills: z.array(z.string()),
  employerQualities: z.array(z.string()),
});

export type CoverLetterFormSchema = z.infer<typeof COVER_LETTER_FORM_SCHEMA>;

const DEFAULT_COVER_LETTER_FORM_VALUES: CoverLetterFormSchema = {
  additionalNotes: '',
  hiringManager: '',
  name: '',
  employer: '',
  employerQualities: [],
  education: '',
  jobDescription: '',
  role: '',
  skills: [],
  workExperience: '',
};

export const CoverLetterForm: FC = () => {
  const { register, handleSubmit, watch, setValue } = useForm({
    resolver: zodResolver(COVER_LETTER_FORM_SCHEMA),
    defaultValues: DEFAULT_COVER_LETTER_FORM_VALUES,
  });
  const { messages, append } = useChat();
  const [formDataLocalStorage, setFormDataLocalStorage, removeFormDataLocalStorage] = useLocalStorage<CoverLetterFormSchema>(
    'form-data',
    DEFAULT_COVER_LETTER_FORM_VALUES,
    {
      serializer: (data) => JSON.stringify(data),
      deserializer: (data) => {
        const parsedData = JSON.parse(data);
        const validatedData = COVER_LETTER_FORM_SCHEMA.safeParse(parsedData);

        if (!validatedData.success) return DEFAULT_COVER_LETTER_FORM_VALUES;

        return validatedData.data;
      },
    },
  );
  const [saveInformationLocalStorage, setSaveInformationLocalStorage, removeSetInformationLocalStorage] = useLocalStorage<boolean>(
    'save-information',
    false,
    {
      serializer: (data) => JSON.stringify(data),
      deserializer: (data) => {
        const parsedData = JSON.parse(data);
        return typeof parsedData === 'boolean' ? parsedData : false;
      },
    },
  );
  const [saveInformation, setSaveInformation] = useState(false);

  const lastMessage = messages[messages.length - 1];

  const toggleSaveInformation = () => {
    setSaveInformation((prev) => !prev);
  };

  const handleDynamicListChange = (
    field: keyof CoverLetterFormSchema,
    newList: string[],
  ) => {
    setValue(field, newList);
  };

  const handleFormSubmit: SubmitHandler<CoverLetterFormSchema> = async (data) => {
    if (saveInformation) {
      setFormDataLocalStorage({
        ...DEFAULT_COVER_LETTER_FORM_VALUES,
        skills: data.skills,
        education: data.education,
        workExperience: data.workExperience,
        name: data.name,
      });
      setSaveInformationLocalStorage(true);
    } else {
      removeFormDataLocalStorage();
      removeSetInformationLocalStorage();
    }

    await append({
      role: 'user',
      content: JSON.stringify(data),
    });
  };

  useEffect(() => {
    setValue('skills', formDataLocalStorage.skills);
    setValue('workExperience', formDataLocalStorage.workExperience);
    setValue('education', formDataLocalStorage.education);
    setValue('name', formDataLocalStorage.name);
  }, [formDataLocalStorage, setValue]);

  useEffect(() => {
    setSaveInformation(saveInformationLocalStorage);
  }, [saveInformationLocalStorage]);

  return (
    <div className={clsx(['flex', 'flex-col', 'gap-5'])}>
      <form
        className={clsx([
          'w-full',
          'flex',
          'flex-col',
          'gap-5',
          'items-center',
        ])}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className={clsx(['w-full', 'flex', 'flex-col', 'gap-4'])}>
          <Input
            {...register('name')}
            label="Your name"
            placeholder="e.g., John Doe"
            fullWidth
            required
          />

          <Input
            {...register('employer')}
            label="Employer"
            placeholder="e.g., Google, Microsoft, etc."
            fullWidth
            required
          />

          <Input
            {...register('hiringManager')}
            label="Hiring manager"
            placeholder="e.g., John Smith"
            description="This is the name of the hiring manager. If you don't know, leave it blank."
            fullWidth
          />

          <Input
            {...register('role')}
            label="Role"
            placeholder="e.g., Software Engineer, Product Manager, etc."
            fullWidth
            required
          />

          <Textarea
            {...register('jobDescription')}
            label="Job Description"
            placeholder="Enter the job description"
            description="It is recommended to copy and paste the job description here."
            fullWidth
            required
          />

          <Textarea
            {...register('workExperience')}
            label="Describe your work experience"
            placeholder="Enter your work experience"
            fullWidth
            required
          />

          <Textarea
            {...register('education')}
            label="Describe your education"
            placeholder="Enter your education"
            fullWidth
            required
          />

          <Textarea
            {...register('additionalNotes')}
            label="Additional notes"
            placeholder="e.g., I am a fast learner, I am a team player, etc."
            description="These are the additional notes that you want to include in the cover letter."
            fullWidth
          />

          <DynamicList
            items={watch('skills')}
            label="Your skills"
            onChange={(newList) => handleDynamicListChange('skills', newList)}
            description="These are the skills that you have. e.g., JavaScript, React, etc."
            fullWidth
          />

          <DynamicList
            items={watch('employerQualities')}
            label="Qualities of the employer you consider important"
            onChange={(newList) => handleDynamicListChange(
              'employerQualities',
              newList,
            )}
            description="These are the qualities of the employer that you consider important. e.g., team culture, work-life balance, unlimited PTO, etc."
            fullWidth
          />

          <Checkbox
            label="Save my personal information"
            checked={saveInformation}
            onChange={toggleSaveInformation}
            description="Saves your personal information on your own computer. Nothing is saved on our servers."
          />
        </div>

        <Button type="submit">Generate cover letter</Button>
      </form>

      {lastMessage?.role === 'assistant' && (
        <div className={clsx(['flex', 'flex-col', 'w-full', 'gap-2.5'])}>
          <p>Here&apos;s your cover letter:</p>

          <p
            className={clsx([
              'whitespace-pre-wrap',
              'w-full',
              'p-5',
              'border',
              'border-border-primary',
              'bg-background-secondary',
            ])}
          >{lastMessage.parts.map((
            part,
            index,
          ) => (
            <span key={`${lastMessage.id}-${index}`}>{part.type === 'text' && part.text}</span>
          ))}</p>
        </div>
      )}
    </div>
  );
};