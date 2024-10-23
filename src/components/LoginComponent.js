import React, { useState } from 'react';
import {useNavigate,useSearchParams} from "react-router-dom"
const LoginComponent = ({ onLogin }) => {
  const [searchParams]=useSearchParams()
  const pathname=searchParams.get("redirectTo")
  const history=useNavigate()
  const [is_reg,set_is_reg]=useState(true)
  const [errMessage,setErrMessage]=useState()

  console.log(pathname)
  async function sendData(fetchUrl,postData){   
    try{
        console.log(fetchUrl,postData)
        let response=await fetch(fetchUrl,{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body: JSON.stringify(postData)})
        let res=await response.json()
        return res
    }catch(error){
        console.log(error)
    }
}
async function onSignup(event){
event.preventDefault()
let form=document.getElementsByClassName("form")[0]
let formData=new FormData(form)
let formItrt2=formData.entries()
console.log(formItrt2)
let formDict2={}
for(const [key,value] of formItrt2){
    formDict2[key]=value
}
console.log(formDict2)
const response=await sendData("http://localhost:5200/users/signup",formDict2)
let formDict={}
if(response && response.status==200){
        Object.keys(formDict2).filter((elem)=>elem!="name").map((key)=>{
            console.log(key)
            return formDict[key]=formDict2[key]
        })
        console.log(formDict)

        setTimeout(async ()=>{


            let response_signin= await sendData("http://localhost:5200/users/signin",formDict)
            console.log(response_signin)
            if(response_signin){
                localStorage.setItem("UserName",response_signin.user.name)
                console.log(response_signin.id)
                let id=response_signin.id
                localStorage.setItem("token",response_signin.token)
                console.log(id)
                history(`/${pathname}?userId=${id}`)
              
                localStorage.setItem("login",true)
            }
            
        },[1000])
}else{
    console.log(response)
    setErrMessage(()=>{
        return response.message
    })
}

}


async function onSignin(event){
event.preventDefault()
let form=document.getElementsByClassName("form")[0]
let formData=new FormData(form)
let formItrt2=formData.entries()
console.log(formItrt2)
let formDict2={}
for(const [key,value] of formItrt2){
    formDict2[key]=value
}
console.log(formDict2)
let response=await sendData("http://localhost:5200/users/signin",formDict2)
console.log("ye",response)
if(response.status==200){
    localStorage.setItem("UserName",response.user.name)
        
        localStorage.setItem("token",response.token)
        let id=response.id  
        localStorage.setItem("login",true)
        console.log(`/${pathname}?userId=${id}`)
        history(`${pathname}?userId=${id}`)
        
    }else{
        console.log(response.message)
        setErrMessage(()=>{
            return response.message
        })
        
      
    }





}


function onRegister(){
set_is_reg(()=>{
    return false
})
}

let blinkError=(errType)=>{
console.log(errType)
setTimeout(()=>{
    errType.classList.remove("opacity-0")
    errType.classList.add("opacity-100")
    errType.classList.add("transition-opacity")
    errType.classList.add("duration-300")
    
},[100])

setTimeout(()=>{
    errType.classList.remove("opacity-100")                  
    errType.classList.add("opacity-0")                    
},[3000]) 

errType.classList.remove("transition-opacity")
errType.classList.remove("duration-300")
}

if(errMessage){
console.log("yo")
let err=document.getElementsByClassName("err")[0]
blinkError(err)
}


  return (
    <main className="main flex flex-col justify-center items-center h-[100vh] ">
      
    <form className={`form flex flex-col bg-white h-md:h-[320px] h-md:w-[430px] h-sm:w-[270px] h-sm:h-[51vh] shadow-md p-[15px] justify-between mt-[40px]`}>
    <h1 className='flex justify-center items-start'>
      
      <span className="text-[22px]">{is_reg==true? "Signin":"Register"} </span></h1>
      
      {is_reg==true?null:
      <div className="name flex flex-col  justify-between ">
      <label htmlFor="name" className='name_label text-sm text-[12px] text-[#5E5E5E] font-semibold'>Name:</label>
      <input type="text" id="name" name="name" required className=" border-[rbg(0,10,0)] border-[0.5px] bg-[rgb(249,252,254)] w-[78%]"/>
      </div>
      }
      <div className="email flex flex-col  justify-between ">
        <label htmlFor="email" className='email_label text-sm text-[12px] text-[#5E5E5E] font-semibold'>Email:</label>
        <input type="text" id="email" name="email" required className=" border-[rbg(0,10,0)] border-[0.5px] bg-[rgb(249,252,254)] w-[78%]"/>
        </div>
        <div className="password flex flex-col  justify-between">
        <label htmlFor="password" className='password_label text-sm text-[12px] text-[#5E5E5E] font-semibold'>Password:</label>
        <input type="password" id="password" name="password" required className="border-[rbg(0,10,0)] border-[0.5px] bg-[rgb(249,252,254)] w-[75%]"/>
        </div>
  
        <button type="submit " className='bg-blue-600 text-[white] mt-[12px]' onClick={is_reg?onSignin:onSignup}>{is_reg?"Signin":"Register"}</button>

        {is_reg===true?<div className="Signin flex justify-center items-center mt-[-18px] text-sm">
            Not a member yet? <span className="text-blue-600 " onClick={onRegister}>Register</span>
        </div>:<div className="flex justify-center items-center mt-[1px] text-sm ">Already a user? <span className="text-blue-600 " onClick={()=>{
            set_is_reg(()=>{
                return true
            })
        }}> Signin</span></div>}
    </form>
    <div className="err mt-[20px] opacity-0 text-red-400">{errMessage}
    </div>
    </main>

  );
};

export default LoginComponent;
