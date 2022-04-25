
const express =require('express');
const mongoose =require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, 'Please provide name'], minlength: 3, maxlength: 50},
        email: { type: String, required: [true, 'Please provide email'], match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide valid email'
        ], unique: true},
        password: { type: String, required: [true, 'Please provide password'], minlength: 6},
        
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;