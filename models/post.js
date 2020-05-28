const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const PIC_PATH = path.join('/uploads/pic_posts/pics');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    pic:{
        type:String
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', PIC_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });


// static
postSchema.statics.uploadedPic = multer({storage:  storage}).single('pic');
postSchema.statics.picPath = PIC_PATH;


const Post = mongoose.model('Post', postSchema);
module.exports = Post;