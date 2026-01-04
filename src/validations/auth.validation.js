import { object, string } from 'zod';

export const registerSchema = object({
    body: object({
        name: string().min(2, 'Name must be at least 2 characters long'),
        email: string().email('Invalid email address'),
        password: string().min(6, 'Password must be at least 6 characters long'),
    }).strict(),
});

export const loginSchema = object({
    body: object({
        email: string().email('Invalid email address'),
        password: string().min(6, 'Password must be at least 6 characters long'),
    }).strict(),
});