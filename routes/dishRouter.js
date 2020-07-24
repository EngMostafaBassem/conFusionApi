const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose')
const Dishes=require('../Models/dishModel')
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

//#region routing Dishes
dishRouter.route('/')
.get((req,res) => {
    
    Dishes.find({}).then(Dishes=>{
        console.log('Dishes Retrived Successfully')
        res.setHeader('Content-Type','application/json')
        res.json(Dishes)
    }).catch(err=>{
        console.log(err)
    })
})
.post((req, res) => {

    Dishes.create(req.body).then(Dish=>{

        console.log('Dish is Added Successfully')
        res.statusCode=201
        res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
    }).catch(err=>{
        console.log(err)
    })
    
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res) => {
    res.end('Deleting all dishes');

    Dishes.remove({}).then(res=>{
        console.log(res)
        res.statusCode=202
        res.end('Deleting All Dishes')
    }).catch(err=>{
        console.log(err)
    })
});

//#endregion


//#region routing Dishes/:dishId
dishRouter.route('/:dishId')

.get((req,res)=>{
    

   Dishes.findById(req.params.dishId).then(Dish=>{
       console.log(Dish)
       console.log('Retrived The dish Successfully')
       res.statusCode=200
       res.setHeader('Content-Type','application/json')
       res.json(Dish)
   }).catch(err=>{
       console.log(err)
   })
   
})
.post((req,res)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})
.put((req,res)=>{

    Dishes.findByIdAndUpdate(req.params.dishId,{$set:req.body},{new:true}).
    then(Dish=>{
          console.log('The Dish which is '+Dish+'updated Successfully')
          res.end('Updated Successully')
    })
    res.end('Will update  the dish of id  '+req.params.dishId)
})


.delete((req,res)=>{
Dishes.findByIdAndDelete(req.params.dishId).then(resp=>{
    console.log(resp)
    res.end('Will delete the dish of id '+req.params.dishId)
}).catch(err=>{
    console.log(err)
})
})
//#endregion


//#region routing Dishes/:dishId/comments

dishRouter.route('/:dishId/comments')

.get((req,res)=>{
    

   Dishes.findById(req.params.dishId).then(Dish=>{
     
       console.log('Retrived The dish Successfully')
       res.statusCode=200
       res.setHeader('Content-Type','application/json')

       if(Dish.comments)
       {
       
           res.json(Dish.comments)
       }

       else{
      
            res.json('No Comments Found For this Dish')
       }
       
       res.json(Dish)
   }).catch(err=>{
       console.log(err)
   })
   
})
.post((req,res)=>{
    
   
    Dishes.findById(req.params.dishId).then(Dish=>{
        if(Dish!=null)
        {
            const comments=req.body

            for(let i=0;i<comments.length;i++)
            {
                Dish.comments.push(comments[i])
                
            }
            Dish.save()
            res.statusCode=200
            res.end('New Comments Of Dish added Successfully')
        }
        else{
            res.statusCode=404
            res.end('There is no dish of the id '+req.params.dishId)
        }
    })
  

})
.put((req,res)=>{

    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes/'
        + req.params.dishId + '/comments');
})


.delete((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null) {
            for (var i = (dish.comments.length -1); i >= 0; i--) {
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));    
});



//#endregion


//#region routing Dishes/:dishId/comments/commentId

dishRouter.route('/:dishId/comments/:commentId')
.get((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments.id(req.params.commentId));
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId
        + '/comments/' + req.params.commentId);
})
.put((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            if (req.body.rating) {
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                dish.comments.id(req.params.commentId).comment = req.body.comment;                
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            }, (err) => next(err));
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            dish.comments.id(req.params.commentId).remove();
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            }, (err) => next(err));
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


//#endregion


module.exports = dishRouter;