const express=require('express')
const route = require('../Auth/logout')
const router=express.Router()
const Users=require('../Models/userModel')
const authUser=require('../Auth/passportJwt')
const authAdmin=require('../Auth/admin-Auth')

router.route('/').
get(authUser.verifyUser,authAdmin.verifyAdmin, (req,res)=>{
    Users.find({}).then(result=>{
        res.setHeader('Content-Type','application/json')
        res.json(result)
      }).catch(err=>{
        res.json(err)
      })
})
module.exports=router