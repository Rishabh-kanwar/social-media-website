const Todo=require('../models/todo');
const User=require('../models/user');

module.exports.home=async function(req, res){
        let user=await User.findById(req.user._id).populate(
          'todo'
      );
      
        return res.render('TODO',{
            title: "TODO List",
            todo_list: user.todo
        });
}

// category dueDate '

module.exports.remove = async function (req, res) {
  try{
  console.log("req.body");
  console.log(req.body);
    for(let i in req.body){
      
       await Todo.findByIdAndDelete(req.body[i]);

       let user=await User.findByIdAndUpdate(req.user._id,{ $pull: {todo:req.body[i]} } );

    }
    req.flash('success','Item are Removed from list');
                    return res.redirect('back');
  }
  catch(err)
  {
    console.log("error",err);
  }
  }

  module.exports.create1=async function(req,res){
    try{
           let user=await User.findById(req.user._id);

            console.log(req.body);
            let newtodo=await Todo.create({
                category: req.body.category,
                discription: req.body.discription,
                dueDate: req.body.dueDate,
                user: req.user._id
            });
            user.todo.push(newtodo);
            user.save();
                    console.log('******', newtodo);
                    req.flash('success','Item is added to the list');
                    return res.redirect('back');
              
    }catch(err){
      req.flash('error',err);
         return;
    }
    
  }
  
// for calculator
  module.exports.calculator=function(req, res){
    return res.render('calculator',{
        title: "Calculator",
    });
  }