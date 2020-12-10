const Post = require('../../models/post');

module.exports = {
    post: async () => {
        try {
        const post = await Post.find();
        return post.map(singlePost => {
                return {
                    ...singlePost._doc,
                    _id: singlePost.id
                };
            });
        } catch (err) {
            throw err;
        }
    },
    

    createPost: async (args, req) => {
        const post = new Post({
            title: args.postInput.title,
            content: args.postInput.content,
            price: +args.postInput.price,
            status: true,
            image: args.postInput.image,
            category: args.postInput.category,
            date: new Date().toISOString()         
        });
        let createdPost;
        try {
        const result = await post
        .save()
            createdPost = {
                ...result._doc,
                _id: result.id
            };
            return createdPost;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    deletePost: async (args, req) => {
        try {
            const deletedPost = await Post.findByIdAndRemove({_id: args.postId});
            return deletedPost;
        } catch(err) {
            throw err;
        }
    },

    updatePost: async (args, req) => {
        try {
            const filter = {_id: args.postId};
        
            const updatedPost = await Post.findOneAndUpdate(filter, args.postUpdateInput, { "new": true})
            return updatedPost;
            
        } catch(err) {
            throw err;
        }
}
    
};