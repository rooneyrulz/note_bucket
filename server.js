import express from 'express';
import { createServer } from 'http';
import { config } from 'dotenv';
import logger from 'morgan';

// IMPORT ROUTES
import testRoute from './routes/api/test';
import userRoute from './routes/api/user';
import authRoute from './routes/api/auth';

const app = express();
const server = createServer(app);

// LOAD DOTENV
config();

// USE HTTP-LOGGER MIDDLEWARE - MORGAN
app.use(logger('dev'));

app.use('/api/test', testRoute);
app.use('/api/users', userRoute);
app.use('/api/users/auth', authRoute);

// LISTEN TO THE SERVER
server.listen(process.env.PORT || 5000, () =>
  console.log(`server running on port ${process.env.PORT || 5000}...`)
);
