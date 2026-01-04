import { registerUser, loginUser } from "../services/auth.service.js";

export const registerController = async (req, res, next) => {
    try {
        const user = await registerUser(req.body);
        return res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: user,
        });
    } catch (error) {
        next(error);
    }
}

export const loginController = async (req, res, next) => {
    try {
        const result = await loginUser(req.body);
        return res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: result,
        });
    } catch (error) {
        next(error);
    }
}