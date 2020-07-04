const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/user/avatar');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    todo: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Todo'
        }
    ],
    friendships: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        }
    ],
    friendReq: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        }
    ],
    pong:{
       type:Number 
    },
    snake:{
         type: Number 
    },
    online:{
        type:Boolean
    }
    
}, {
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });


// static
let maxSize = 10 * 1000 * 1000;
userSchema.statics.uploadedAvatar = multer({storage:  storage,limits: { fileSize: maxSize }}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;


const User = mongoose.model('User', userSchema);
module.exports = User;