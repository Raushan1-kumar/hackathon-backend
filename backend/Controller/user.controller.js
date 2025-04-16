const userModel=require('../Model/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register_user=async(req,res)=>{
    try{
        const {fullname,email,password}=req.body;
        console.log(req.body);
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


const logout_user = async (req, res) => {
    try {

      res.status(200).json({
        message: "Logged out successfully",
        success: true
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        message: "Error during logout",
        success: false
      });
    }
  };


  const forgot_password = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({
          message: "Email is required",
          success: false
        });
      }
  
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false
        });
      }
  
      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
  
      // Save reset token to user
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = resetTokenExpiry;
      await user.save();
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
  
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        html: `
          <h1>Password Reset</h1>
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="${resetUrl}">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `
      };
      await transporter.sendMail(mailOptions);

      res.status(200).json({
        message: "Password reset email sent",
        success: true
      });
  
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({
        message: "Error processing password reset",
        success: false
      });
    }
  };

  const reset_password = async (req, res) => {
    try {
      const { token, newPassword } = req.body;
  
      const user = await userModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });
  
      if (!user) {
        return res.status(400).json({
          message: "Invalid or expired reset token",
          success: false
        });
      }

      
 const hashedPassword = await bcrypt.hash(newPassword, 10);


 user.password = hashedPassword;
 user.resetPasswordToken = undefined;
 user.resetPasswordExpires = undefined;
 await user.save();

 res.status(200).json({
   message: "Password reset successful",
   success: true
 });

} catch (error) {
 console.error('Reset password error:', error);
 res.status(500).json({
   message: "Error resetting password",
   success: false
 });
}
};


module.exports={
    register_user,
    login_user,
    logout_user,
    forgot_password,
    reset_password
}