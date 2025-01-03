const {job_model,user_model}=require("../connect")
require("dotenv").config()
const jwt=require("jsonwebtoken")
const  CustomError  = require("../ErrorClass.js")
const { verifyToken } = require('../middleware/authMiddleware');
let get_func_score=async (req,res)=>{
    console.log("getting")
    try{
       
    let uid=req.query.uid
    let user=await user_model.find({uid:uid})

    console.log(user)
    let score=user[0].score[0]
    res.status(200).json(score)
}catch(err){
        console.log(err)
        res.status(404).json(err)
    }
}


let post_func_score=async (req,res)=>{
    console.log(req.body,req.query)
     
    try{    
        let uid=req.query.uid
        console.log(req.query)
        const updatedUser = await user_model.findOneAndUpdate(
            {uid:uid},               // Find the document by _id
            { $push: { score: req.body.score } },
            { new: true }        // Return the updated document
          );
          console.log(updatedUser);
        res.status(200).json(updatedUser)
    }catch(err){
        console.log(err)
        res.send(err)
    }
    
}




let post_func_user= async (req, res) => {
    try {
      const { email } = req.body;
      console.log(req.user)
      const firebaseUid = req.user.uid;
  
      // Create user in MongoDB
      let user=await user_model.create({email:email,uid:firebaseUid})
        console.log("created",user)
        res.status(200).json({status:200,user:user})
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: error.message });
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