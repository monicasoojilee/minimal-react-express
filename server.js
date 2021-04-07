import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();

// Application Middleware (CORS, built-in body-parser);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware Template (e.g. assign prop `me` to incoming request object);
// app.use((req, res, next) => {
//   req.me = users[1];
//   next();
// });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.EXPRESS_PORT, 5000, () => console.log(`Express listening on port ${process.env.EXPRESS_PORT}!`));