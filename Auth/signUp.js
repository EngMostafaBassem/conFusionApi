
const express=require('express')
const router=express.Router()
const bcyrpt=require('bcrypt')
const Users=require('../Models/userModel');

router.post('/', (req, res, next) => {
 
  const {userName}=req.body
  
  Users.find({userName}).then(async(result)=>{
    console.log(result)
    if(result.length!=0){
    
      
      res.json({status:'failed',result:'UserName Exists before'})
    }
    else{
      const newUser=new Users(req.body)
      newUser.password=await bcyrpt.hash(newUser.password,10)
      newUser.save().then(user=>{
        res.json({status:'success',result:'Registerd Successfully'})
      }).catch(err=>{
        console.log(err)
      })
      
    }
  }).catch(err=>res.json(err))
});

router.get('/',(req,res)=>{
  Users.find({}).then(result=>{
    res.setHeader('Content-Type','application/json')
    res.json(result)
  }).catch(err=>{
    res.json(err)
  })
})


router.delete('/',(req,res)=>{
  Users.remove({}).then(result=>{
    res.setHeader('Content-Type','application/json')
    res.json({status:'success',message:'deleted Successfully'})
  }).catch(err=>{
    res.json(err)
  })
})

module.exports=router
