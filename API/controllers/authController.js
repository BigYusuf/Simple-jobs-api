const User = require('../models/userModel')
const {StatusCodes}= require('http-status-codes');
//const {BadRequestError} = require('../errors')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
   /* const {name, email, password} = req.body
   if(!name || !email || !password){
       throw new BadRequestError('Please provide name, email and password')
    }*/
   /*----------------------hashing password--------------------------*/
   const {name, email, password} = req.body
   
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt)
   
   const tempUser = {name, email, password: hashedPassword}
   /*----------------------hashing password--------------------------*/

    const user = await User.create({...tempUser})
    res.status(StatusCodes.CREATED).json({ user })// since mongoose will be doing all d validation
}
const login = async (req, res) => {
    res.send('login')
}

module.exports = { register, login }