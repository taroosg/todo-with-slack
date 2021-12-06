import { findAll, findToday, } from '../repositories/todo.repository.js';
import { WebClient, } from '@slack/web-api';
import dotenv from 'dotenv';
import cron from 'node-cron';

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

// cron.schedule('*/3 * * * * *', () => console.log('3秒ごとに実行'));

cron.schedule('20 31 21 * * *', () => postAllTodoData());
cron.schedule('30 31 21 * * *', () => postTodayTodoData());
