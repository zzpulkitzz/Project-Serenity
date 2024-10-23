let mongoose= require('mongoose')

const { Schema } = mongoose;
let connect=async (url)=>{
    try{
        await mongoose.connect(url)
        return null
    }
    catch(error){
        return error
    }
}

let user_schema=new Schema({
    name:{type:String,required:[true,"provide the name"],unique:false},
    email:{type:String,required:[true,"provide the email"],unique:true},
    password:{type:String,required:[true,"provide the password name"],unique:false},
    score:{type:Number},
})




let user_model=mongoose.model("User",user_schema)

module.exports={connect,user_model}
