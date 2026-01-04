import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from '../src/routes/auth.routes.js';
import projectRoutes from '../src/routes/project.routes.js';
import taskRoutes from '../src/routes/task.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

export default app;
app.use(errorMiddleware);