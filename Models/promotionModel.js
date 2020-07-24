const mongoose=require('mongoose')
const Schema=mongoose.Schema
require('mongoose-currency').loadType(mongoose)
const Currency=mongoose.Types.Currency
const pormotionSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    label:{
        type:String,
        default:''
    },
    price:{
        type:Currency,
        required:true

    },
    description:{
        type:String,
        required:true
    },
    featured:{
        type:Boolean,
        required:true
    }
},{timestamps:true})


const Promotions=mongoose.model('Promotion',pormotionSchema)
module.exports=Promotions