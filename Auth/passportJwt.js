const  JwtStrategy=require('passport-jwt').Strategy
const ExtractJwt=require('passport-jwt').ExtractJwt
const jwt=require('jsonwebtoken')
const passport = require('passport')
const Users=require('../Models/userModel')
/*JWT strategy*/
exports.getWebToken=function(user){
    return jwt.sign(user,'123',{expiresIn:3600})
}

var opt={}
opt.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken()
opt.secretOrKey='123'
passport.use(new JwtStrategy(opt,(jwt_payload,done)=>{
       console.log('Jwt '+jwt_payload._id)
       Users.findOne({_id:jwt_payload._id},(err,user)=>{
           if(err){
               return done(err,false)
           }
           else if(user){
               return done(null,user)
           }
           else{
               return done(null,false)
           }
       })
}))


exports.verifyUser=passport.authenticate('jwt',{session:'false'})