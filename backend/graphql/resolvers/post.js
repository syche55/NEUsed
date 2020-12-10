const { mustBeSignedIn } = require('../../auth');
const Post = require('../../models/post');

    // display posts
    async function post() {
        try {
        const post = await Post.find();
        return post.map(singlePost => {
                return {
                    ...singlePost._doc,
                    _id: singlePost.id,
                    createdAt: new Date(singlePost._doc.createdAt).toISOString(),
                    updatedAt: new Date(singlePost._doc.updatedAt).toISOString()
                };
            });
        } catch (err) {
            throw err;
        }
    }
    
    // create new posts
    async function createPost(args) {
        const post = new Post({
            title: args.postInput.title,
            content: args.postInput.content,
            price: +args.postInput.price,
            status: true,
            image: args.postInput.image,
            category: args.postInput.category,
        });
        let createdPost;
        try {
        const result = await post
        .save()
            createdPost = {
                ...result._doc,
                _id: result.id,
                createdAt: new Date(result._doc.createdAt).toISOString(),
                updatedAt: new Date(result._doc.updatedAt).toISOString()
            };
            return createdPost;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    // delete posts
    async function deletePost (args){
        try {
            const deletedPost = await Post.findByIdAndRemove({_id: args.postId});
            return deletedPost;
        } catch(err) {
            throw err;
        }
    }

    // update posts
    async function updatePost (args) {
        try {
            const filter = {_id: args.postId};
            const updatedPost = await Post.findOneAndUpdate(filter, args.postUpdateInput, { "new": true})
            return updatedPost;
            
        } catch(err) {
            throw err;
        }
}
module.exports = {
    post: post,
    createPost: mustBeSignedIn(createPost),
    deletePost: mustBeSignedIn(deletePost),
    updatePost: mustBeSignedIn(updatePost)
};