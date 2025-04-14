const userModel=require('../Model/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register_user=async(req,res)=>{
    try{
        const {fullname,email,password}=req.body;
        if(!fullname || !email ||!password){
            return res.status(401).json({
                message:"something is missing,please check!",
                success:false,
            });
        }
        const user=await userModel.findOne({email});
        if(user){
            return res.status(401).json({
                message:"Try different email",
                success:false,
            });
        };

        const hashedPassword=await bcrypt.hash(password,10);
        await userModel.create({
            fullname,
            email,
            password:hashedPassword
        });
        return res.status(201).json({
            message:"Account created successfully",
            success:true,
        });
    } catch(error){
        console.log(error);
    }
}

const login_user=async(req,res)=>{
    try{
        const {email, password}=req.body;
        console.log(email);
        if(!email || !password){
          return res.status(401).json({
              messageModel:"Something is missing, please check!",
              success:false,
          });
        }

        let user=await userModel.findOne({email});
        console.log(user)
        if(!user){
          return res.status(401).json({
              message:"Incorrect email or password",
              success:false,
          });
        }
        const isPasswordMatch=await bcrypt.compare(password, user.password);

        if(!isPasswordMatch){
          return res.status(401).json({
              message:"Incorrect email or password",
              success:false,
          });
        };

        const token =  jwt.sign({userId:user._id}, process.env.SECRET_KEY,{expiresIn:'1d'});

        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
           
          }

          return res
          .status(200)
          .json({
            message:` Welcome back ${user.fullname}`,
            success: true,
            user,
            token
          });

     } catch(error){
        console.log(error);
     }
}


module.exports={
    register_user,
    login_user
}