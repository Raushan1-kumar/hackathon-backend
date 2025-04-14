const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jsonwebtoken=require('jsonwebtoken');


const userschema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        minLength:[3,"Minimum three letter is required"]
        
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
        minLength:[8,"Minimum eight letter is required"]
    },
  
});




const User=mongoose.model('User',userschema);
module.exports=User;