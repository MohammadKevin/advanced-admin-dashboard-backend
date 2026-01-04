    import express from 'express';
    import {
        createProjectController,
        getProjectsController,
        getProjectByIdController,
        updateProjectController,
        deleteProjectController,
    } from '../controllers/project.controller.js';

    import { validate } from '../middlewares/validate.middleware.js';
    import {
        createProjectSchema,
        updateProjectSchema,
        projectIdParamSchema,
    } from '../validations/project.validation.js';

    import { authMiddleware } from '../middlewares/auth.middleware.js';

    const router = express.Router();

    router.post(
        '/',
        authMiddleware,
        validate(createProjectSchema),
        createProjectController
    );

    router.get(
        '/',
        authMiddleware,
        getProjectsController
    );

    router.get(
        '/:id',
        authMiddleware,
        validate(projectIdParamSchema),
        getProjectByIdController
    );

    router.put(
        '/:id',
        authMiddleware,
        validate(projectIdParamSchema),
        validate(updateProjectSchema),
        updateProjectController
    );

    router.delete(
        '/:id',
        authMiddleware,
        validate(projectIdParamSchema),
        deleteProjectController
    );

    export default router;