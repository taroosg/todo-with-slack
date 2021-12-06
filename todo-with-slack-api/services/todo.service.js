
import { findAll, findToday, store, update, destroy } from '../repositories/todo.repository.js';

export const getAllTodoData = async () => {
  try {
    return findAll();
  } catch (e) {
    throw Error('Error while getting All Todo Data');
  }
};

export const getTodayTodoData = async () => {
  try {
    return findToday();
  } catch (e) {
    throw Error('Error while getting Today Todo Data');
  }
};


export const insertTodoData = async ({ data }) => {
  try {
    return await store({ data: data });
  } catch (e) {
    throw Error('Error while posting Todo Data');
  }
};

export const updateTodoData = async ({ id, data }) => {
  try {
    return await update({ id, data });
  } catch (e) {
    throw Error('Error while updating Todo Data');
  }
};

export const destroyTodoData = async ({ id }) => {
  try {
    return await destroy({ id: id, });
  } catch (e) {
    throw Error('Error while deleting Todo Data');
  }
};