const mongoose=require('mongoose');



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
    resetPasswordToken: String,
    resetPasswordExpires: Date
  
});




const User=mongoose.model('User',userschema);
module.exports=User;