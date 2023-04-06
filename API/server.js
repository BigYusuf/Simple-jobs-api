require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
const express = require('express');
const app = express();

const connectDatabase = require('./db/database');
const authenticateUser = require('./middleware/authentication');
// routers
const authRouter = require('./routes/authRouter');
const jobsRouter = require('./routes/jobsRouter');
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
// swagger
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./API/swagger.yaml');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
  );
  
  app.use(helmet());
  app.use(cors());
  app.use(xss());
  app.use(express.json());

  
  app.get('/', (req, res) => {
    res.send('<h1>Jobs API</h1><p>Welcommmme to the simmple jobs API </p><a href="/api-docs">Documentation</a>');
  });
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDatabase();
    app.listen(port, () =>
      console.log(`Server at ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
