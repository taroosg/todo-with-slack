// src/components/Todo.jsx
import axios from 'axios';

export const Todo = ({
  hoge,
  id,
  todo,
  deadline,
  is_done,
  user_id,
  created_at,
  updated_at,
  getData,
}) => {

  const updateTodoData = async (params) => {
    const { id: { }, ...data } = params;
    const newData = { ...data, ...{ is_done: is_done ? false : true } };
    console.log(newData);
    const requestUrl = "http://localhost:3001/todo";
    const updatedData = await axios.put(`${requestUrl}/${params.id}`, newData);
    const result = await getData();
    return updatedData;
  };

  const deleteTodoData = async (id) => {
    const requestUrl = "http://localhost:3001/todo";
    const removedData = await axios.delete(`${requestUrl}/${id}`);
    const result = await getData();
    return removedData;

  }

  return (
    <li key={hoge} id={id}>
      <input type="checkbox" checked={is_done} onChange={() => updateTodoData({ id, todo, deadline, is_done, user_id })} />
      {/* 🔽 追加 */}
      <button type="button" onClick={() => deleteTodoData(id)}>delete</button>
      <p>
        {deadline} {todo} by {user_id} at {created_at} and {updated_at}
      </p>
    </li>
  );
};
