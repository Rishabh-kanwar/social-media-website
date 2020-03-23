const Todo=require('../models/todo');
module.exports.home=function(req, res){

    Todo.find({}, function(err, todo_list){
        if(err){
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('home',{
            title: "TODO List",
            todo_list: todo_list
        });

    });
}
