import express from 'express';
import { readAllTodoData, readTodayTodoData, createTodoData, editTodoData, deleteTodoData } from '../controllers/todo.controller.js';

export const todoRouter = express.Router();

todoRouter.get('/', (req, res) => readAllTodoData(req, res));
todoRouter.get('/today', (req, res) => readTodayTodoData(req, res));
todoRouter.post('/', (req, res) => createTodoData(req, res));
todoRouter.put('/:id', (req, res) => editTodoData(req, res));
todoRouter.delete('/:id', (req, res) => deleteTodoData(req, res));
