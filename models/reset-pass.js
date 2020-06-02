const mongoose = require('mongoose');


let resetPassSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    // comment belongs to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isvalid: {
        type: Boolean,
        required: true
    },
    createdAT:{
       type:Date,
       default:Date.now,
       expires: 3000
    }

});

const Reset = mongoose.model('Reset', resetPassSchema);
module.exports = Reset;