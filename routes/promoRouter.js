const express=require('express')
const promoRouter=express.Router()

const bodyParser = require('body-parser');
promoRouter.use(bodyParser.json());

const authUser=require('../Auth/passportJwt')
const authAdmin=require('../Auth/admin-Auth')


const Promotions=require('../Models/promotionModel')

//#region  route with /
promoRouter.route('/').
 get((req,res)=>{

    
    
    Promotions.find({}).then(promotions=>{
        console.log('All promotions will send to you')
        res.setHeader('Content-Type','application/json')
        res.statusCode=200
        res.json(promotions)
    }).catch(err=>{
        console.log(err)
    })
   
})
.post(authUser.verifyUser,authAdmin.verifyAdmin,(req,res)=>{
    Promotions.create(req.body).then(promotion=>{
        console.log('New Promotion has been added Successfully'+promotion)
        res.setHeader('Content-Type','application/json')
        res.statusCode=201
        res.json('New Promotion has been added Successfully')
    }).catch(err=>{
        console.log(err)
    })
})
.put(authUser.verifyUser,authAdmin.verifyAdmin,(req,res)=>{
    res.statusCode=403
    res.send('No updates in promotions are allowed!!!')
})
.delete(authUser.verifyUser,authAdmin.verifyAdmin,(req,res,next)=>{

    Promotions.remove({}).then(resp=>{
        console.log('Info about deleted Promotion '+res)
        res.statusCode=201
        res.setHeader('Content-Type','application/json')
        res.end('All Promotions has been removed Successfully')
    }).catch(err=>{
        console.log(err)
    })
   
  
})
//#endregion



//#region  route with promoId

promoRouter.route('/:promoId')

.get((req,res,next)=>{
    
    Promotions.findById(req.params.promoId).then(promo=>{
        res.statusCode=200
        res.setHeader('Content-Type','application/json')
        res.json(promo)
    }).catch(err=>{
        console.log(err)
    })
})
.post(authUser.verifyUser,authAdmin.verifyAdmin,(req,res,next)=>{
    res.end('Will add  the promotion of id  '+req.params.promoId)
})
. put(authUser.verifyUser,authAdmin.verifyAdmin,(req,res,next)=>{

    Promotions.findByIdAndUpdate(req.params.promoId,{$set:req.body},{new:true}).then(promo=>{
        res.statusCode=200
       
        res.end('Promotion of Id '+req.params.promoId+' has been updated Successfully')
    }).catch(err=>{
        console.log(err)
    })

    
})
.delete(authUser.verifyUser,authAdmin.verifyAdmin,(req,res,next)=>{

    Promotions.findByIdAndDelete(req.params.promoId).then(resp=>{
        console.log(resp)
        res.statusCode=202
     
        res.end('Promotion of Id '+req.params.promoId+' has been deleted Successfully')
    }).catch(err=>{
        console.log(err)
    })

    
})


//#endregion
module.exports=promoRouter
