import { Booklist } from "./components/Booklist";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { TodoIndex } from "./pages/TodoIndex";
import { TodoToday } from "./pages/TodoToday";
import { TodoPost } from "./pages/TodoPost";
import { TestSlack } from './pages/TestSlack';

const App = () => {
  const languages = ["React", "Vue", "Angular"];

  const getDataFromAPI = async (keyword) => {
    const requestUrl = "https://www.googleapis.com/books/v1/volumes?q=intitle:"
    const result = await axios.get(`${requestUrl}${keyword}`);
    return result;
  }

  const NotFound = () => {
    return <h2>Not Found...</h2>;
  };

  return (
    <BrowserRouter>
      <h1>Todoリストアプリケーション</h1>
      <ul>
        <li>
          <Link to="/todo/index">todo 一覧（全件）</Link>
        </li>
        <li>
          <Link to="/todo/today">todo 一覧（本日）</Link>
        </li>
        <li>
          <Link to="/todo/post">todo 入力</Link>
        </li>
        {/* 🔽 追加 */}
        <li>
          <Link to="/test-slack">test slack</Link>
        </li>
      </ul>
      <hr />
      {/* <h1>react app</h1>
        <ul>
          <li>
            <Link to="/react">React</Link>
          </li>
          <li>
            <Link to="/vue">Vue</Link>
          </li>
          <li>
            <Link to="/angular">Angular</Link>
          </li>
        </ul>
        <hr /> */}
      <Routes>
        <Route path="/todo/index" element={<TodoIndex />} />
        <Route path="/todo/today" element={<TodoToday />} />
        <Route path="/todo/post" element={<TodoPost />} />
        <Route path="/test-slack" element={<TestSlack />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;