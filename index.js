
/* Intialization*/
const express = require('express')
const mongoose=require('mongoose')
const app = express();
const cookie_parser=require('cookie-parser')
const session=require('express-session')
const fileStore=require('session-file-store')(session)
const basicAuth=require('./Auth/Basic-Auth')
const url = 'mongodb://localhost:27017/conFusion';
var passport = require('passport');
var authenticateConfig = require('./Auth/passportConfig')
const bodyParser=require('body-parser')
const cors=require('cors')


const dishRouter=require('./routes/dishRouter')
const promoRouter=require('./routes/promoRouter')
const leaderRouter=require('./routes/leaderRouter')
const login=require('./Auth/login')
const signUp=require('./Auth/signUp')
const logout=require('./Auth/logout')
const userRouters=require('./routes/userRouter')
const uploadRouter=require('./routes/uploadRouter')
const favouriteRouter=require('./routes/favouriteRoutes')

/*Basic Setup*/
const connect=mongoose.connect(url)
connect.then(db=>{
  console.log('Connected To conFusion DB successfully')
})
/*
app.use(session({
  name:'session-id',
  secret:'12345-67890-09876-54321',
  saveUninitialized:false,
  resave:false,
  store:new fileStore()

}))*/
const passportConfig=require('./Auth/passportConfig')
passportConfig(passport)
app.use(bodyParser.json())
app.use(passport.initialize());
//app.use(cors())
//app.use(passport.session());

/*Mouting Routers*/
app.use('/login',login)
app.use('/signup',signUp)



app.use('/main',(req,res)=>{
  res.end('Welcome Home')
})

app.use('/imageUpload',uploadRouter)
//app.use(basicAuth)
app.use('/users',userRouters)
app.use('/dishes',dishRouter)
app.use('/promotions',promoRouter)
app.use('/leaders',leaderRouter)
app.use('/logout',logout)
app.use('/Favourites',favouriteRouter)


/*start server*/
app.listen(3001)