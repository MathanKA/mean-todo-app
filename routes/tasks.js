var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://mathan:mathan@ds159507.mlab.com:59507/mean-tasklist', ['tasks']);

// Get All tasks
router.get('/tasks', function(request, response, next){
    db.tasks.find(function(err, tasks){
        if(err){
            response.send(err);
        }
        response.json(tasks);
    });
});

//Get single tasks
router.get('/task/:id', function(request, response, next){
    db.tasks.findOne({_id: mongojs.ObjectId(request.params.id)}, function(err, task){
        if(err){
            response.send(err);
        }
        response.json(task);
    });
});


//save task
router.post('/task', function(request,response, next){
    var task = request.body;
    if(!task.title || !(task.isDone + '')){
        response.status(400);
        response.json({
            "error": "Bad data"
        });
    }else{
        db.tasks.save(task, function(err, task){
            if (err) {
                response.send(err);
            }
            response.json(task);
        });
    }
});

// Delete Task
router.delete('/task/:id', function(request, response, next){
    db.tasks.remove({_id: mongojs.ObjectId(request.params.id)}, function(err, task){
        if(err){
            response.send(err);
        }
        response.json(task);
    });
});

//update Task
router.put('/task/:id', function(request, response, next){
    var task = request.body;
    var updTask = {};

    if(task.isDone){
        updTask.isDone = task.isDone;
    }
    if(task.title){
        updTask.title = task.title;
    }
    if(!updTask){
        response.status(400);
        response.json({
            "error": "Bad data"
        });
    }else{
        db.tasks.update({ _id: mongojs.ObjectId(request.params.id)}, updTask, {}, function (err) {
            if (err) {
                response.send(err);
            }
            response.json(task);
        });
    }
  
});
module.exports = router;
