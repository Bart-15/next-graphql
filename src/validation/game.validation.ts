import { object, string, z } from 'zod';

export const AddGameValidation = object({
  title: string().min(1, 'Title is required'),
});

export type GameFormValues = z.infer<typeof AddGameValidation>;
