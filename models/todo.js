const mongoose=require('mongoose');
const todo_Schema= new mongoose.Schema({
    discription: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    dueDate : {
        type: String,
        required: true
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
    const Todo = mongoose.model('Todo',todo_Schema);
    module.exports=Todo;