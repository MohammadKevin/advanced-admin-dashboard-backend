import prisma from '../utils/prisma.js';
import AppError from '../utils/appError.js';

const taskInclude = {
  assignedTo: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
  project: {
    select: {
      id: true,
      name: true,
    },
  },
};

export const createTask = async (data, user) => {
  const project = await prisma.project.findUnique({
    where: { id: data.projectId },
  });

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  if (user.role !== 'ADMIN' && project.ownerId !== user.id) {
    throw new AppError('Access denied', 403);
  }

  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status ?? 'TODO',
      projectId: data.projectId,
      assignedToId: user.id, // ✅ FIX
    },
    include: taskInclude,
  });
};

export const getTasks = async (user) => {
  if (user.role === 'ADMIN') {
    return prisma.task.findMany({ include: taskInclude });
  }

  return prisma.task.findMany({
    where: { assignedToId: user.id },
    include: taskInclude,
  });
};

export const getTaskById = async (taskId, user) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: taskInclude,
  });

  if (!task) {
    throw new AppError('Task not found', 404);
  }

  if (user.role !== 'ADMIN' && task.assignedToId !== user.id) {
    throw new AppError('Access denied', 403);
  }

  return task;
};

export const updateTask = async (taskId, data, user) => {
  await getTaskById(taskId, user);

  return prisma.task.update({
    where: { id: taskId },
    data,
    include: taskInclude,
  });
};

export const deleteTask = async (taskId, user) => {
  await getTaskById(taskId, user);

  await prisma.task.delete({
    where: { id: taskId },
  });

  return { message: 'Task deleted successfully' };
};