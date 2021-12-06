import { findAll, findToday, } from '../repositories/todo.repository.js';
import { WebClient, } from '@slack/web-api';
import dotenv from 'dotenv';

dotenv.config();

const postToSlack = async (text) => {
  const token = process.env.SLACK_API_TOKEN;
  const channel = '#test';
  const client = new WebClient(token);
  const response = await client.chat.postMessage({ channel, text });
  console.log(response.ok);
  return response;
}

export const postAllTodoData = async () => {
  try {
    const todoData = await findAll();
    const text = todoData.map((x) => `${x.deadline}\t${x.todo}`).join('\n');
    return postToSlack(`現在のTodo！\n${text}`);
  } catch (e) {
    throw Error('Error while getting All Todo Data');
  }
};

export const postTodayTodoData = async () => {
  try {
    const todoData = await findToday();
    const text = todoData.map((x) => `${x.deadline}\t${x.todo}`).join('\n');
    return postToSlack(`本日締切！！\n${text}`);
  } catch (e) {
    throw Error('Error while getting Today Todo Data');
  }
};

