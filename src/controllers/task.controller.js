import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../services/task.service.js';

export const createTaskController = async (req, res, next) => {
  try {
    const task = await createTask(req.body, req.user);
    return res.status(201).json({
      status: 'success',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const getTasksController = async (req, res, next) => {
  try {
    const tasks = await getTasks(req.user);
    return res.status(200).json({
      status: 'success',
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskByIdController = async (req, res, next) => {
  try {
    const task = await getTaskById(req.params.id, req.user);
    return res.status(200).json({
      status: 'success',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTaskController = async (req, res, next) => {
  try {
    const task = await updateTask(req.params.id, req.body, req.user);
    return res.status(200).json({
      status: 'success',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTaskController = async (req, res, next) => {
  try {
    const result = await deleteTask(req.params.id, req.user);
    return res.status(200).json({
      status: 'success',
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};