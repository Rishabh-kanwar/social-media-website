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
    }
});
    const Todo = mongoose.model('Todo',todo_Schema);
    module.exports=Todo;