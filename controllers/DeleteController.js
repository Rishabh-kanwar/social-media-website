const Todo=require('../models/todo');
module.exports.remove = function (req, res) {
    for(let i in req.body){
      
       Todo.findByIdAndDelete(req.body[i], function (err) {
        if (err) {
          console.log('error in deleting'); return;
        }
  
      })
    }
    return res.redirect('back');
  }