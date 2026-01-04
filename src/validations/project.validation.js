import { object, string, number  } from "zod";

export const createProjectSchema = object({
    body: object({
        name: string().min(3, 'Project name must be at least 3 characters long'),
        description: string().optional(),
    }).strict(),
});

export const updateProjectSchema = object({
    body: object({
        name: string().min(3, 'Project name must be at least 3 characters long').optional(),
        description: string().optional(),
    }).strict(),
});

export const projectIdParamSchema = object({
    params: object({
        id: string()
            .transform((val) => Number(val))
            .refine((val) => Number.isInteger(val) && val > 0, {
                message: 'Project ID must be a positive integer',
            }),
    }).strict(),
});