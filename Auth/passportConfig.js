
const Users = require('../Models/userModel')
const LocalStrategy=require('passport-local').Strategy

const bycrypt=require('bcrypt')

const passportConfig=(passport,getUserByID)=>{

    /*local Strategy*/
    const authenticateUser= (userName,password,done)=>{
        Users.findOne({userName}).then(async(User)=>{
            if(!User){
               return done(null,false,{message:'UserName or password'})
            }
            else{
                  try{
                     // console.log('password'+password)
                      //console.log('hasedPassword'+User.password)
                if(await bycrypt.compare(password,User.password) ){
                    //  console.log('success')
                    return done(null,User)
                }
                else{
                    return done(null,false,{message:'UserName or password'})
                }
            }catch(ex){return done(ex,false)}
            }
        }).catch(err=>done(err,false))
        
    }
    passport.use(new LocalStrategy({usernameField:'userName'},authenticateUser))
 
    passport.serializeUser((user,done)=>{return done(null,user._id)});
     
    passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
      done(err, user);
    });
  })


  
}
module.exports=passportConfig