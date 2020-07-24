const express = require('express')
const mongoose=require('mongoose')

const app = express();
const url = 'mongodb://localhost:27017/conFusion';

const connect=mongoose.connect(url)
connect.then(db=>{
  console.log('Connected To conFusion DB successfully')
})
const bodyParser=require('body-parser')
const dishRouter=require('./routes/dishRouter')
const promoRouter=require('./routes/promoRouter')
const leaderRouter=require('./routes/leaderRouter')
app.use(bodyParser.json())

app.use('/dishes',dishRouter)
app.use('/promotions',promoRouter)
app.use('/leaders',leaderRouter)

app.listen(3001)