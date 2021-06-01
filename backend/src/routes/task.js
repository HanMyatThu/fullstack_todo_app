import express from 'express';
import authMiddleware from '../middleware/auth';
import {
    getAllTodo,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
} from '../controllers/TaskController';

const router = express.Router();

//private routes
router.get('/tasks',authMiddleware, getAllTodo);

router.post('/tasks', authMiddleware, createTodo);

router.get('/tasks/:id', authMiddleware, getTodoById);

router.put('/tasks/:id', authMiddleware, updateTodo);

router.delete('/tasks/:id', authMiddleware, deleteTodo);

export default router;