import prisma from '../utils/prisma.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.js';
import AppError from '../utils/appError.js';
import { createAuditLog } from './auditLog.service.js';

export const registerUser = async ( { name, email, password }) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new AppError('User with this email already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: 'STAFF',
        },
    });

    await createAuditLog(
        newUser.id,
        'REGISTER',
        `User registered with email: ${newUser.email}`
    )

    return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
    };
}


export const loginUser = async ( {email, password }) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new AppError('Invalid email or password', 400);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError('Invalid email or password', 400);
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role }, '1d');

    await createAuditLog(
        user.id,
        'LOGIN',
        `User logged in with email: ${user.email}`
    )

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
}