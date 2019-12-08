/* eslint-disable no-underscore-dangle */
import express from 'express';
import bodyParser from 'body-parser';
import graphqlHttp from 'express-graphql';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from './config/logger';
import schema from './schema';

dotenv.config();

const app = express();

const port = process.env.PORT || 3004;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => logger.info('Connected to db')).catch((err) => logger.info(err));

app.use('/graphql', graphqlHttp({
  schema,
  graphiql: true,
}));

app.get('/', (_req, res) => {
  res.status(200).json({
    status: 200,
    data: {
      message: 'Welcome to SMS Management App',
    },
  });
});

// Error handler
app.use((err, _req, res, next) => {
  res.status(500).json({
    status: 500,
    data: {
      message: 'An error ocurred, please recheck your request parameters, then resend request!',
      error: err,
    },
  });
  next();
});

app.listen(port, () => logger.info('Server listening on port', port));

export default app;
