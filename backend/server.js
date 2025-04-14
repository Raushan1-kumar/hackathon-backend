const http=require('http');
const express = require('express');
const dotenv=require('dotenv');
dotenv.config();
const app = require('./app');
const server=http.createServer(app);
server.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})