import express from 'express';
import { createServer } from 'http';
import { config } from 'dotenv';
import logger from 'morgan';

// IMPORT ROUTES
import testRoute from './routes/api/test';

const app = express();
const server = createServer(app);

// LOAD DOTENV
if (process.env.NODE_ENV === 'development') config();

// USE HTTP-LOGGER MIDDLEWARE - MORGAN
if (process.env.NODE_ENV === 'development') app.use(logger('dev'));

app.use('/api', testRoute);

// LISTEN TO THE SERVER
server.listen(process.env.PORT || 5000, () =>
  console.log(`server running on port ${process.env.PORT || 5000}...`)
);
