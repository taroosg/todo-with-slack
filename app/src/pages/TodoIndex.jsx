// src/pages/TodoIndex.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { Todo } from "../components/Todo";
import useSWR from "swr";

export const TodoIndex = () => {
  const dummyTodoList = [
    {
      id: 1,
      todo: "test1",
      deadline: "2022-02-02",
      user_id: "1",
      id_done: false,
      created_at: JSON.stringify(new Date()),
      updated_at: JSON.stringify(new Date()),
    },
    {
      id: 2,
      todo: "test2",
      deadline: "2022-02-22",
      user_id: "2",
      id_done: false,
      created_at: JSON.stringify(new Date()),
      updated_at: JSON.stringify(new Date()),
    },
    {
      id: 3,
      todo: "test3",
      deadline: "2022-02-28",
      user_id: "3",
      id_done: false,
      created_at: JSON.stringify(new Date()),
      updated_at: JSON.stringify(new Date()),
    },
  ];

  const [todoList, setTodoList] = useState(null);

  const getAllTodo = async () => {
    const result = await axios.get("http://localhost:3001/todo");
    setTodoList(result.data.result);
    return result;
  };

  useEffect(() => {
    getAllTodo();
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

  const { data, error } = useSWR("http://localhost:3001/todo", fetcher, options);

  // 🔽 追加
  return (
    <ul>
      {data?.map((x, i) => (
        <Todo
          key={x.id}
          id={x.id}
          todo={x.todo}
          deadline={x.deadline}
          is_done={x.is_done}
          user_id={x.user_id}
          created_at={x.created_at}
          updated_at={x.updated_at}
          getData={getAllTodo}
        />
      ))}
    </ul>
  );

  // return (
  //   <ul>
  //     {todoList?.map((x, i) => (
  //       <Todo
  //         key={x.id}
  //         id={x.id}
  //         todo={x.todo}
  //         deadline={x.deadline}
  //         is_done={x.is_done}
  //         user_id={x.user_id}
  //         created_at={x.created_at}
  //         updated_at={x.updated_at}
  //         getData={getAllTodo}
  //       />
  //     ))}
  //   </ul>
  // );
};
