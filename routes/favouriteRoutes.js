const express=require('express')
const router=express.Router()
const authUser=require('../Auth/passportJwt')
const Favourites=require('../Models/favourites')
router.route('/').
get(authUser.verifyUser,(req,res)=>{ 
    const userID=req.user._id;
 
    Favourites.findOne({user:userID}).populate('user').populate('dishes') .then(result=>{
        res.setHeader('content-Type','application/json')
        res.statusCode=200
        res.json({result:'Success',Favourites:result})
    }).catch(err=>{
        res.json({result:'failure',msg:err})
    })

})
.post(authUser.verifyUser,(req,res)=>{

   const userID=req.user._id;
   const favDishes=req.body
   Favourites.findOne({user:{_id:userID}}).populate('user','dishes').then(result=>{

    if(result==null){

        const fav=new Favourites({user:userID})
        for(let item of favDishes){
            fav.dishes.push(item._id)
        }

     fav.save().then(fav=>{
        res.setHeader('content-Type','application/json')
        res.statusCode=200
        res.json({result:'Posted Successfully',Favourites:fav})
     }).catch(err=>{
        res.json({result:'failure',msg:err})
     })
    }

    else{
        for(let item of favDishes){
            result.dishes.push(item._id)
        }

        result.save().then(fav=>{
            res.setHeader('content-Type','application/json')
            res.statusCode=200
            res.json({result:'Posted Successfully',Favourites:fav})
         }).catch(err=>{
            res.json({result:'failure',msg:err})
         })
    }




   }).catch(err=>{
    res.json({result:'failure',msg:err})
   })

})
.delete(authUser.verifyUser,(req,res)=>{

    const userID=req.user._id;
    Favourites.findOne({user:userID}).populate('user').populate('dishes').then(fav=>{
         if(fav==null)
         {
             res.setHeader('Content-Type','application/json')        
             res.json({result:'failure',msg:'No Result Found'})
         }
         else{
             Favourites.findByIdAndRemove(fav._id).then(resp=>{
                res.setHeader('Content-Type','application/json')         
                res.json({result:'success',msg2:'Favourite Dishes Deleted Successfully'})
             }).catch(err=>{
                res.json({result:'failure',msg:err})
             })
         }
    }).catch(err=>{
        res.json({result:'failure',msg:err})
    })

})


router.route('/:dishID').
get(authUser.verifyUser,(req,res)=>{
    res.end('Not Handled Yet')

})
.post(authUser.verifyUser,(req,res)=>{
    const userID=req.user._id
    Favourites.findOne({user:userID}).populate('user').populate('dishes').
    then(result=>{
       
        if(result==null)
        {
           const newFav=new Favourites({user:userID})
           newFav.dishes.push(req.params.dishID)
           newFav.save().then(dish=>{
            res.json({result:'success',msg:'Your dish has been added to your Favourites!!!!'})
           }).catch(err=>{
            res.json({result:'failure',msg:err})
           })
        }
        else{

            const isdishFound=result.dishes.some(item=>item._id.toString()===req.params.dishID.toString())
            console.log(result.dishes)
            console.log('param '+req.params.dishID)
            if(isdishFound){
                res.json({result:'failure',msg:'This dish is found before'})
            }
            else{
                result.dishes.push(req.params.dishID)
                result.save().then(dish=>{
                    res.json({result:'success',msg:'Your dish has been added to your Favourites!!!!'})
                }).catch(err=>{
                    res.json({result:'failure',msg:err})
                })
            }
        }
    })
})
.delete(authUser.verifyUser,(req,res)=>{
    const userID=req.user._id;
    Favourites.findOne({user:userID}).populate('user').populate('dishes').then(fav=>{
         if(fav==null)
         {
             res.setHeader('Content-Type','application/json')          
             res.json({result:'failure',msg:'No Result Found'})
         }
       

           const deletedDish=fav.dishes.find(item=>item._id.toString()===req.params.dishID.toString())         
           fav.dishes.splice(fav.dishes.indexOf(deletedDish),1)   
           if(fav.dishes.length!=0)
           {
               fav.save().then(result=>{
                res.setHeader('Content-Type','application/json')
                res.json({result:'success',msg:'Favourite Dishes Deleted Successfully'})
               }).catch(err=>{
                res.json({result:'failure',msg:err})
               })
           }
           else{
            Favourites.findByIdAndRemove(fav._id).then(resp=>{
                res.setHeader('Content-Type','application/json')          
                res.json({result:'success',msg:'Favourite Dishes Deleted Successfully'})
             }).catch(err=>{
                res.json({result:'failure',msg:err})
             })
           }
         
        
    }).catch(err=>{
        res.json({result:'failure',msg:err})
    })

})
module.exports=router