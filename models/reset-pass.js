const mongoose = require('mongoose');


const resetPassSchema = new mongoose.Schema({
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
    }
},{
    timestamps: true
});

const Reset = mongoose.model('Reset', resetPassSchema);
module.exports = Reset;