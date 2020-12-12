const { mustBeSignedIn } = require('../../auth');
const Post = require('../../models/post');

    // display posts
    async function post(args) {
        const idFilter = args._id;
        const emailFilter = args.email;
        const categoryFilter = args.category;
        try {
            const post = await Post.find();
            if (idFilter != null) {
                filteredIDPosts = post.filter(function(filterIDPost){
                    return filterIDPost._id == idFilter;
                });
            } else {
                filteredIDPosts=post;
            }
            if (emailFilter != null) {
                filteredEmailPosts = post.filter(function(filterEmailPost){
                    return filterEmailPost.email == emailFilter;
                });
            } else {
                filteredEmailPosts=filteredIDPosts;
                }
            if (categoryFilter !=null) {
                filteredCategoryPosts = filteredEmailPosts.filter(function(filterCategoryPost){
                    return filterCategoryPost.category == categoryFilter;
                });
            } else {
                filteredCategoryPosts = filteredEmailPosts;
            }
                return filteredCategoryPosts.map(singlePost => {
                    return {
                        ...singlePost._doc,
                        _id: singlePost.id,
                        createdAt: new Date(singlePost._doc.createdAt).toISOString(),
                        updatedAt: new Date(singlePost._doc.updatedAt).toISOString()
                    };
                });
            }

             catch (err) {
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
            creator: args.postInput.creator,
            email: args.postInput.email
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
    createPost: createPost,
    deletePost: deletePost,
    updatePost: updatePost
};
