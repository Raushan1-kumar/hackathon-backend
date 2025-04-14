const express=require('express');
const router=express.Router()

const user_controller=require('../Controller/user.controller')

router.post('/register',user_controller.register_user)
router.post('/login',user_controller.login_user)
module.exports=router;