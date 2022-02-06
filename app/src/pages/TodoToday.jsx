// src/pages/TodoIndex.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { Todo } from "../components/Todo";
import useSWR from "swr";

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

  const fetcher = async (url) => (await axios.get(url)).data.result;

  const options = {
    // 初期データ
    initialData: null,
    // pollingの期間（ミリ秒）
    refreshInterval: 1000,
    // windowのフォーカス時にRevalidateする
    revalidateOnFocus: true,
  };

  const { data, error } = useSWR("http://localhost:3001/todo/today", fetcher, options);

  // 🔽 追加

  return (
    <ul>
      {data?.map((x, i) => (
        <Todo
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
