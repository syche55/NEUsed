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
                reqiuired: false
            },

            price: {
                type: Number,
                required: false
            },
            // date: {
            //     type: Date,
            //     required: false
            // },
            author: {
                type: String,
                required: false
            },
            status: {
                type: Boolean,
                required: false
            },
            image: {
                type: String,
                required: false
            },
            category: {
                type: String,
                enum: categoryType
            },
            email: {
                type: String,
                required: false
            }
},
{ timestamps: true});

module.exports = mongoose.model('Post', postSchema);
