const express =require('express');

const jobsRouter = express.Router();
const  { getAllJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobsController')

jobsRouter.route('/').get(getAllJobs).post(createJob)
jobsRouter.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)

module.exports = jobsRouter;