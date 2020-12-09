const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    postTitle: {
        type: String,
        required: true
    },
    postContent:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false
    },
    date:{
        type: Date,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    price:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);