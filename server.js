import express from 'express';
import { createServer } from 'http';
import { config } from 'dotenv';
import logger from 'morgan';
import mongoose from 'mongoose';
import bluebird from 'bluebird';

// IMPORT ROUTES
import testRoute from './routes/api/test';
import userRoute from './routes/api/user';
import authRoute from './routes/api/auth';
import noteRoute from './routes/api/note';
import profileRoute from './routes/api/profile';

// IMPORT MONGODB CONNECTION
import db from './config/database';

const app = express();
const server = createServer(app);

// LOAD DOTENV
config();

// USE MONGOOSE PROMISE LIBRARY -BLUEBIRD
mongoose.Promise = bluebird;

// ESTABLISH MONGO CONNECTION
db();

// USE HTTP-LOGGER MIDDLEWARE - MORGAN
app.use(logger('dev'));

// EXPRESS MIDDLEWARE FOR PARSING JSON BODY
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// HANDLING CORS ERRORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use('/api/test', testRoute);
app.use('/api/users', userRoute);
app.use('/api/users/auth', authRoute);
app.use('/api/notes', noteRoute);
app.use('/api/profiles', profileRoute);

// LISTEN TO THE SERVER
server.listen(process.env.PORT || 5000, () =>
  console.log(`server running on port ${process.env.PORT || 5000}...`)
);
