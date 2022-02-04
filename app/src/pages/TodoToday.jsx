// src/pages/TodoIndex.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { Todo } from "../components/Todo";

export const TodoToday = () => {

  const [todoList, setTodoList] = useState(null);

  const getTodayTodo = async () => {
    const result = await axios.get("http://localhost:3001/todo/today");
    setTodoList(result.data.result);
    return result;
  };

  useEffect(() => {
    getTodayTodo();
  }, []);

  return (
    <ul>
      {todoList?.map((x, i) => (
        <Todo
          hoge={i}
          id={x.id}
          todo={x.todo}
          deadline={x.deadline}
          is_done={x.is_done}
          user_id={x.user_id}
          created_at={x.created_at}
          updated_at={x.updated_at}
          getData={getTodayTodo}
        />
      ))}
    </ul>
  );
};
