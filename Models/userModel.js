const moongose=require('mongoose')
const Schema=moongose.Schema
const UserSchema=new Schema({

    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    adminRole:{
        type:Boolean,
        default:false
    }
})


const Users=moongose.model('User',UserSchema)
module.exports=Users