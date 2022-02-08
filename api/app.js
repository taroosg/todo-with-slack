import express from 'express';
import { todoRouter } from './routes/todo.route.js';
import { slackRouter } from './routes/slack.route.js';
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = 3001;

app.get('/', (req, res) => {
  res.json({
    uri: '/',
    message: 'Hello Node.js!',
  });
});

// ↓追加
app.use('/todo', (req, res) => todoRouter(req, res));
app.use('/slack', (req, res) => slackRouter(req, res));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

