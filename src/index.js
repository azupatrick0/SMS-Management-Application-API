import express from 'express';
import bodyParser from 'body-parser';
import logger from './config/logger';

const app = express();

const port = process.env.PORT || 3004;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: {
      message: 'Welcome to sms management API, the best sms API on the net',
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
