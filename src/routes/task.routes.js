import express from 'express';
import {
  createTaskController,
  getTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController,
} from '../controllers/task.controller.js';

import { validate } from '../middlewares/validate.middleware.js';
import {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
} from '../validations/task.validation.js';

import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, validate(createTaskSchema), createTaskController);
router.get('/', authMiddleware, getTasksController);
router.get('/:id', authMiddleware, validate(taskIdSchema), getTaskByIdController);
router.put('/:id', authMiddleware, validate(updateTaskSchema), updateTaskController);
router.delete('/:id', authMiddleware, validate(taskIdSchema), deleteTaskController);

export default router;