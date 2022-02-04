import axios from 'axios';

export const TestSlack = () => {

  const postAllTodo = async () => {
    const result = await axios.get("http://localhost:3001/slack");
    console.log(result);
    return result;
  }

  const postTodayTodo = async () => {
    const result = await axios.get("http://localhost:3001/slack/today");
    console.log(result);
    return result;

  }

  return (
    <>
      <button type="button" onClick={postAllTodo}>All</button>
      <button type="button" onClick={postTodayTodo}>Today</button>
    </>
  );
}