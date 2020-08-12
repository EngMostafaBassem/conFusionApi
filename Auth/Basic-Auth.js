

const basicAuth=(req,res,next)=>{
    
   
   if (!req.isAuthenticated()) {
     var err = new Error('You are not authenticated!');
     err.status = 403;
     next(err);
   }
   else {
         next();
   }

}
module.exports=basicAuth