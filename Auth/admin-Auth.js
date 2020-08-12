const { json } = require("body-parser")

exports.verifyAdmin=function(req,res,next){
 if(req.user.adminRole===true)
 {
       return next()
 }
 else{
     res.statusCode=403
     res.json({status:'forbidden',result:'You are not authorized to perfom operation on this page'})
 }
}