import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export const TodoPost = () => {
  const { register, handleSubmit } = useForm();

  const [formData, setFormData] = useState(null);

  const postFormData = async (postData) => {
    setFormData(JSON.stringify(postData));
    const result = await axios.post("http://localhost:3001/todo", postData);
    console.log(result);
    return result;
  };

  return (
    <form onSubmit={handleSubmit(postFormData)}>
      <input {...register("todo")} placeholder="Todo" />
      <input {...register("deadline")} placeholder="Deadline" type="date" />
      <input {...register("user_id")} placeholder="User_id" type="number" />
      <p>{formData}</p>
      <button type="submit">送信</button>
    </form>
  );
};
