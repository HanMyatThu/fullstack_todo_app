import express from 'express';
import authMiddleware from '../middleware/auth';
import {
    createSubTask,
    getSubTaskById,
    getSubTasks,
    updateSubTask,
    deleteSubTask
} from '../controllers/SubTaskController';

const router = express.Router();

router.get('/tasks/:task/subtasks', authMiddleware, getSubTasks );

router.post('/tasks/:task/subtasks', authMiddleware, createSubTask);

router.get('/tasks/:task/subtasks/:subtask', authMiddleware, getSubTaskById);

router.put('/tasks/:task/subtasks/:subtask', authMiddleware, updateSubTask);

router.delete('/tasks/:task/subtasks/:subtask', authMiddleware, deleteSubTask);

export default router;