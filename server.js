import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import path from 'path';

const app = express();

// Application Middleware;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware Template (e.g. assign prop `me` to incoming request object);
// app.use((req, res, next) => {
//   req.me = users[1];
//   next();
// });

app.get('/api/hello', (req, res) => {
  res.send('Hello From Express');
});

app.post('/api/world', (req, res) => {
  res.send(req.body.post);
});

// Production/Deployment Configuration;
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "..", "public")));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
  });
} 

app.listen(process.env.EXPRESS_PORT, 5000, 
  () => console.log(`Express listening on port ${process.env.EXPRESS_PORT}!`));