import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
} from "../services/project.service.js";

export const createProjectController = async (req, res, next) => {
    try {
        const project = await createProject(req.body, req.user);

        return res.status(201).json({
            status: 'success',
            message: 'Project created successfully',
            data: project,
        });
    } catch (error) {
        next(error);
    }
};

export const getProjectsController = async (req, res, next) => {
    try {
        const projects = await getProjects(req.user);

        return res.status(200).json({
            status: 'success',
            data: projects,
        });
    } catch (error) {
        next(error);
    }
};

export const getProjectByIdController = async (req, res, next) => {
    try {
        const projectId = Number(req.params.id);

        const project = await getProjectById(projectId, req.user);

        return res.status(200).json({
            status: 'success',
            data: project,
        });
    } catch (error) {
        next(error);
    }
};

export const updateProjectController = async (req, res, next) => {
    try {
        const projectId = Number(req.params.id);

        const project = await updateProject(projectId, req.body, req.user);

        return res.status(200).json({
            status: 'success',
            message: 'Project updated successfully',
            data: project,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProjectController = async (req, res, next) => {
    try {
        const projectId = Number(req.params.id);

        await deleteProject(projectId, req.user);

        return res.status(200).json({
            status: 'success',
            message: 'Project deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};