const express=require('express');
const app=express();
const cors=require('cors');
const cookie_parser=require('cookie-parser');
const connect_database=require('./config/db');
const userroutes=require('./Routes/user.route')
const medicalroutes= require('./Routes/medical.route')
const emergencyroutes= require('./Routes/emergency.route')

const dotenv=require('dotenv');
dotenv.config();

connect_database();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookie_parser());

app.use('/user',userroutes);
app.use('/medical',medicalroutes);
app.use('/emergency',emergencyroutes)

module.exports=app;