
const express = require('express');
const dotenv = require('dotenv');
const jobsRouter = require('./routes/jobsRouter');
const authRouter = require('./routes/authRouter');
const connectDatabase = require('./db/database');
const path = require('path');


//error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const app = express();
app.use(express.json());
//app.use(cors());
app.use(express.urlencoded({ extended: true }));



//setting up config file
dotenv.config();

//routes
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobss', jobsRouter);

app.get('/', (req, res) => {
  res.send('JOBS API')
})
const port = process.env.PORT || 5000;

const start = async () => {
  try{
    //connecting to connectDatabase
    await connectDatabase();
    // then 
    app.listen(port, () => {
      console.log(`Serve at port:${port}`);
    });
  } catch(error){
    console.log(error);
  }
}
start();