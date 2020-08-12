
const express=require('express')
const route=express.Router()
route.delete('/',(req,res)=>{
   
    req.logOut()
    //req.session.destroy();
   // res.clearCookie()
    res.redirect('/main')
})
module.exports=route
