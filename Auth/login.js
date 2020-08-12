
const express=require('express')
const router=express.Router()
const passport=require('passport')
const auth=require('./passportJwt')
router.post('/', passport.authenticate('local',{failureRedirect:'/main'}), function(req, res) {
      var token = auth.getWebToken({_id: req.user._id});
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true,token:token, status: 'You are successfully logged in!'});
    });
    

module.exports=router