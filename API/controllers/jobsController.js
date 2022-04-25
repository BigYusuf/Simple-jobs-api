
const getAllJobs = async (req, res) => {
    res.send('get all Jobs')
}
const getSingleJobs = async (req, res) => {
    res.send('get single Jobs')
}
const createJob = async (req, res) => {
    res.send('create Jobs')
}
const updateJob = async (req, res) => {
    res.send('update Jobs')
}
const deleteJob = async (req, res) => {
    res.send('delete Jobs')
}

module.exports = { getAllJobs, getSingleJobs, createJob, updateJob, deleteJob }