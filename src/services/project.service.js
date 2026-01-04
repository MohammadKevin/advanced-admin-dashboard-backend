import prisma from '../utils/prisma.js';
import AppError from '../utils/appError.js';
import { createAuditLog } from './auditLog.service.js';

const projectInclude = {
    owner: {
        select: {
            id: true,
            name: true,
            email: true,
        },
    },
};

export const createProject = async (data, user) => {
    if (user.role !== 'ADMIN') {
        throw new AppError('Only admins can create projects', 403);
    }

    await createAuditLog(
        user.id,
        'CREATE',
        `Project created with name: ${data.name}`
    )

    return prisma.project.create({
        data: {
            ...data,
            owner: { connect: { id: user.id } },
        },
        include: projectInclude,
    });
};

export const getProjects = async (user) => {
    if (user.role === 'ADMIN') {
        return prisma.project.findMany({
            include: projectInclude,
        });
    }

    await createAuditLog(
        user.id,
        'READ',
        `Projects accessed by user with id: ${user.id}`
    )

    return prisma.project.findMany({
        where: { ownerId: user.id },
        include: projectInclude,
    });
};

export const getProjectById = async (projectId, user) => {
    const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: projectInclude,
    });

    if (!project) {
        throw new AppError('Project not found', 404);
    }

    if (user.role !== 'ADMIN' && project.ownerId !== user.id) {
        throw new AppError('Access denied', 403);
    }

    await createAuditLog(
        user.id,
        'READ',
        `Project accessed with id: ${projectId}`
    )

    return project;
};

export const updateProject = async (projectId, data, user) => {
    await getProjectById(projectId, user);

    await createAuditLog(
        user.id,
        'UPDATE',
        `Project updated with id: ${projectId}`
    )
    
    return prisma.project.update({
        where: { id: projectId },
        data,
        include: projectInclude,
    });
};

export const deleteProject = async (projectId, user) => {
    await getProjectById(projectId, user);

    await prisma.project.delete({
        where: { id: projectId },
    });

    await createAuditLog(
        user.id,
        'DELETE',
        `Project deleted with id: ${projectId}`
    )

    return { message: 'Project deleted successfully' };
};