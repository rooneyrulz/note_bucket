import express from 'express';
import { createServer } from 'http';
import { config } from 'dotenv';

const app = express();
const server = createServer(app);

if (process.env.NODE_ENV === 'development') config();

app.use('', (req, res, next) => res.status(200).send('App Working!'));

server.listen(process.env.PORT || 5000, () =>
  console.log(`server running on port ${process.env.PORT || 5000}...`)
);
