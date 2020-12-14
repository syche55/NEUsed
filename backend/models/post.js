const mongoose = require('mongoose');
const categoryType = ["Apparel", "Electronics", "Entertainment", "Family", "FreeStuff", "Hobbies", "Other", "Outdoor"];
const Schema = mongoose.Schema;

const postSchema = new Schema({
            title: {
                type: String,
                required: true
            },
    
            content: {
                type: String,
                reqiuired: true
            },

            price: {
                type: Number,
                required: true
            },
            creator: {
                type: String,
                required: true
            },
            status: {
                type: Boolean,
                required: false
            },
            image: {
                type: String,
                required: true
            },
            category: {
                type: String,
                enum: categoryType
            },
            email: {
                type: String,
                required: true
            }
},
{ timestamps: true});

module.exports = mongoose.model('Post', postSchema);
