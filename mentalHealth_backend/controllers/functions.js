const {job_model,user_model}=require("../connect")
require("dotenv").config()
const jwt=require("jsonwebtoken")
const  CustomError  = require("../ErrorClass.js")

let get_func_score=async (req,res)=>{
    console.log("getting")
    try{
       
    let userId=req.query.userId
    console.log(typeof userId)
    let user=await user_model.find({_id:userId})
    console.log(user[0].score)
    let score=user[0].score
    res.status(200).json(score)
}catch(err){
        console.log(err)
        res.status(404).json(err)
    }
}


let post_func_score=async (req,res)=>{
    console.log(req.body.score)
     
    try{    
        let userId=req.query.userId    
        console.log(req.query)
        const updatedUser = await user_model.findByIdAndUpdate(
            userId,               // Find the document by _id
            { score: req.body.score },   // Update the 'score' field
            { new: true }          // Return the updated document
          );
          console.log(updatedUser);
        res.status(200).json(updatedUser)
    }catch(err){
        console.log(err)
        res.send(err)
    }
    
}




let post_func_user=async(req,res)=>{
    try{
        console.log("signining up!")
        console.log(req.body)
        let user=await user_model.create(req.body)
        console.log("created",user)
        res.status(200).json({status:200,user:user})
    }catch(err){
        if (err.code === 11000) {
            let customErr=new CustomError("Email Registered Already",11000)
            console.log(customErr.message)
            res.status(400).json({status:customErr.status, message:customErr.message});
        }else{
            res.status(400).json(err)
            console.log(err)
        }
        
    }
    
}
let post_auth=async(req,res)=>{
    try{
        let {email,password}=req.body
        let matchedData=await user_model.findOne({"email":email})
        console.log(matchedData)

        if(matchedData==null){
            throw new CustomError("Email id not registered",400)
    }else{
    if(matchedData.password===password){
        res.status(200).json({status:200,id:matchedData._id,user:matchedData})
    }else{
        throw new CustomError("sorry wrong password",400)
    }}
    }catch(err){
        console.log("dsv",err)
        res.status(400).json({status:400,message:err.message})
    }
    
    

}
module.exports={post_auth,get_func_score,post_func_score,post_func_user}