const mongoose=require('mongoose');
const dotenv=require('dotenv');
const connect_database=()=>{
    mongoose.connect(process.env.MONGO_URL,{
    }).then((res)=>{
        console.log("connected to database");
    }).catch(()=>{
        console.log("Error occure");
    })
}
module.exports=connect_database;