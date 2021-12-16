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
    console.log(data);
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
    console.log(data);
    return data;
  } catch (e) {
    throw Error('Error while getting Todo Data');
  }
};

export const store = async ({ params }) => {
  try {
    const { data, error } = await supabase
      .from('todo_table')
      .insert([
        {
          ...params,
          is_done: false,
        },
      ]);
    console.log(data);
    return data;
  } catch (e) {
    throw Error('Error while store Todo Data');
  }
};

export const update = async ({ id, params }) => {
  try {
    const { data, error } = await supabase
      .from('todo_table')
      .update({ ...params, updated_at: (new Date()).toISOString() })
      .match({ id: id });
    return data;
  } catch (e) {
    throw Error('Error while updating Todo Data');
  }
};

export const destroy = async ({ id }) => {
  try {
    const { data, error } = await supabase
      .from('todo_table')
      .delete()
      .match({ id: id });
    return data;
  } catch (e) {
    throw Error('Error while deleting Todo Data');
  }
};