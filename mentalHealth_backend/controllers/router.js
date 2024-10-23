const express=require("express")
let {post_func_user,post_auth,get_func_score,post_func_score}=require("./functions")
let routerUsers=express.Router()
let routerAuth=express.Router()
let routerScore=express.Router()
routerUsers.use(express.urlencoded({extended:false}))
routerUsers.use(express.json())

routerAuth.use(express.urlencoded({extended:false}))
routerAuth.use(express.json())

routerScore.use(express.urlencoded({extended:false}))
routerScore.use(express.json())

routerUsers.route("/signup").post(post_func_user)
routerAuth.route("/signin").post(post_auth)
routerAuth.route("/score").get(get_func_score).post(post_func_score)
module.exports={routerUsers,routerAuth,routerScore}
