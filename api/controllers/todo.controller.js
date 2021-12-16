import { getAllTodoData, getTodayTodoData, insertTodoData, updateTodoData, destroyTodoData } from '../services/todo.service.js';

export const readAllTodoData = async (req, res, next) => {
  try {
    const result = await getAllTodoData();
    return res.status(200).json({
      status: 200,
      result: result,
      message: 'Successfully get All Todo Data!',
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

export const readTodayTodoData = async (req, res, next) => {
  try {
    const result = await getTodayTodoData();
    return res.status(200).json({
      status: 200,
      result: result,
      message: 'Successfully get Today Todo Data!',
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};


export const createTodoData = async (req, res, next) => {
  try {
    const { todo, deadline, user_id } = req.body;
    if (!(todo && deadline && user_id)) {
      throw new Error('something is blank');
    }
    const result = await insertTodoData({
      params: { todo: todo, deadline: deadline, user_id: Number(user_id) },
    });
    return res.status(200).json({
      status: 200,
      result: result,
      message: 'Successfully post Todo Data!',
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

export const editTodoData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id, todo, deadline, is_done } = req.body;
    if (!(id && user_id && todo && deadline && is_done)) {
      throw new Error('something is blank');
    }
    const result = await updateTodoData({
      id: id,
      params: req.body,
    });
    return res.status(200).json({
      status: 200,
      result: result,
      message: 'Successfully edit Todo Data!',
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

export const deleteTodoData = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error('something is blank');
    }
    const result = await destroyTodoData({
      id: id,
    });
    return res.status(200).json({
      status: 200,
      result: result,
      message: 'Successfully delete Todo Data!',
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

