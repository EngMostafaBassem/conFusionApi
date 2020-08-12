const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const favSchema=new Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    dishes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Dish'
        }
      ]
       
        
    
    
   
},{timestamps:true})

const Favourites=mongoose.model('Favourite',favSchema)

module.exports=Favourites