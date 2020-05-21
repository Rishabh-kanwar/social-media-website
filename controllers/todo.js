const Todo=require('../models/todo');
module.exports.home=function(req, res){
    Todo.find({user: req.params.id}, function(err, todo_list){
        if(err){
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('TODO',{
            title: "TODO List",
            todo_list: todo_list
        });

    });
}


module.exports.remove = function (req, res) {
  console.log("req.body");
  console.log(req.body);
    for(let i in req.body){
      
       Todo.findByIdAndDelete(req.body[i], function (err) {
        if (err) {
          console.log('error in deleting'); return;
        }
  
      })
    }
    return res.redirect('back');
  }

  module.exports.create1=function(req,res){
      console.log(req.body);
      Todo.create({
          category: req.body.category,
          discription: req.body.discription,
          dueDate: req.body.dueDate,
          user: req.user._id
      }, function(err, newtodo){
          if(err){console.log('Error in adding in todo')
              return;}
              console.log('******', newtodo);
              return res.redirect('back');
      });
  }
  

