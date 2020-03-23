const Todo = require('../models/todo');
module.exports.create1=function(req,res){
    console.log(req.body);
    Todo.create({
        category: req.body.category,
        discription: req.body.discription,
        dueDate: req.body.dueDate,
    }, function(err, newtodo){
        if(err){console.log('Error in adding in todo')
            return;}
            console.log('******', newtodo);
            return res.redirect('back');
    });
}
