import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

export const findAll = async () => {
  try {
    const { data, error } = await supabase
      .from('todo_table')
      .select()
      .order('deadline', { ascending: true })
      .order('todo', { ascending: true });

    return data;
  } catch (e) {
    throw Error('Error while getting Todo Data');
  }
};

export const findToday = async () => {
  try {
    const { data, error } = await supabase
      .from('todo_table')
      .select()
      .lte('deadline', (new Date()).toISOString())
      .order('deadline', { ascending: true })
      .order('todo', { ascending: true });
    return data;
  } catch (e) {
    throw Error('Error while getting Todo Data');
  }
};

export const store = async ({ data }) => {
  try {
    const { result, error } = await supabase
      .from('todo_table')
      .insert([
        {
          user_id: data.user_id,
          todo: data.todo,
          deadline: data.deadline,
          is_done: false,
        },
      ])
    return result;
  } catch (e) {
    throw Error('Error while store Todo Data');
  }
};

export const update = async ({ id, data }) => {
  try {
    const { result, error } = await supabase
      .from('todo_table')
      .update({ ...data, updated_at: (new Date()).toISOString() })
      .match({ id: id });
    return result;
  } catch (e) {
    throw Error('Error while updating Todo Data');
  }
};

export const destroy = async ({ id }) => {
  try {
    const { result, error } = await supabase
      .from('todo_table')
      .delete()
      .match({ id: id });
    return result;
  } catch (e) {
    throw Error('Error while deleting Todo Data');
  }
};