import prisma from '../utils/prisma.js';

export const createAuditLog = async (userId, action, details) => {
    return prisma.auditLog.create({
        data: {
            userId,
            action,
            details,
        },
    }
    );
};