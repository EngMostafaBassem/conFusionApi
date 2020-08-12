const express=require('express')
const leaderRouter=express.Router()

const bodyParser = require('body-parser');
leaderRouter.use(bodyParser.json());
const authUser=require('../Auth/passportJwt')
const authAdmin=require('../Auth/admin-Auth')
const Leaders=require('../Models/leaderModel')

//#region  route with /

leaderRouter.route('/').
 get((req,res)=>{

    
    
    Leaders.find({}).then(leaders=>{
        console.log('All leaders will send to you')
        res.setHeader('Content-Type','application/json')
        res.statusCode=200
        res.json(leaders)
    }).catch(err=>{
        console.log(err)
    })
   
})
.post(authUser.verifyUser,authAdmin.verifyAdmin, (req,res)=>{
    Leaders.create(req.body).then(leaders=>{
        console.log('New leader has been added Successfully'+leaders)
        res.setHeader('Content-Type','application/json')
        res.statusCode=201
        res.json('New leader has been added Successfully')
    }).catch(err=>{
        console.log(err)
    })
})
.put(authUser.verifyUser,authAdmin.verifyAdmin, (req,res)=>{
    res.statusCode=403
    res.send('No updates in leaders are allowed!!!')
})
.delete(authUser.verifyUser,authAdmin.verifyAdmin, (req,res,next)=>{

    Leaders.remove({}).then(resp=>{
        console.log('Info about deleted leader '+res)
        res.statusCode=201
        res.setHeader('Content-Type','application/json')
        res.end('All leaders has been removed Successfully')
    }).catch(err=>{
        console.log(err)
    })
   
  
})

//#endregion



//#region  route with /:leaderId


leaderRouter.route('/:leaderId')

.get((req,res,next)=>{
    
    Leaders.findById(req.params.leaderId).then(leader=>{
        res.statusCode=200
        res.setHeader('Content-Type','application/json')
        res.json(leader)
    }).catch(err=>{
        console.log(err)
    })
})
.post(authUser.verifyUser,authAdmin.verifyAdmin, (req,res,next)=>{
    res.end('Will add  the leader of id  '+req.params.leaderId)
})
. put(authUser.verifyUser,authAdmin.verifyAdmin, (req,res,next)=>{

    Leaders.findByIdAndUpdate(req.params.leaderId,{$set:req.body},{new:true}).then(leader=>{
        res.statusCode=200     
        res.end('leader of Id '+req.params.leaderId+' has been updated Successfully')
    }).catch(err=>{
        console.log(err)
    })

    
})
.delete(authUser.verifyUser,authAdmin.verifyAdmin, (req,res,next)=>{

    Leaders.findByIdAndDelete(req.params.leaderId).then(resp=>{
        console.log(resp)
        res.statusCode=202
     
        res.end('leader of Id '+req.params.leaderId+' has been deleted Successfully')
    }).catch(err=>{
        console.log(err)
    })

    
})


//#endregion
module.exports=leaderRouter
