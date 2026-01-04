import { object, string, enum as zodEnum, coerce } from 'zod';

export const createTaskSchema = object({
  body: object({
    title: string().min(3, 'Title minimal 3 karakter'),
    description: string().optional(),
    projectId: coerce.number().int().positive(),
    status: zodEnum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
    dueDate: string().optional(),
  }),
});

export const updateTaskSchema = object({
  params: object({
    id: coerce.number().int().positive(),
  }),
  body: object({
    title: string().min(3).optional(),
    description: string().optional(),
    status: zodEnum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
    dueDate: string().optional(),
  }),
});

export const taskIdSchema = object({
  params: object({
    id: coerce.number().int().positive(),
  }),
});