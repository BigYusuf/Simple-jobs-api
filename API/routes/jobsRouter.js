const express =require('express');

const jobsRouter = express.Router();
const  { getAllJobs, getSingleJobs, createJob, updateJob, deleteJob } = require('../controllers/jobsController')

jobsRouter.route('/').get(getAllJobs).post(createJob)
jobsRouter.route('/:id').get(getSingleJobs).delete(deleteJob).patch(updateJob)

module.exports = jobsRouter;