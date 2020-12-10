// const Post = require('../../models/post');
// // const User = require('../../models/user');
// const { dateToString } = require('../../helpers/date');
// const post = async postIds => {
//     try {
//         const post = await Post.find({ _id: { $in: postIds } });
//         return post.map(singlePost => {
//             return transformPost(singlePost);
//         });
        
//     } catch (err) {
//         throw err;
//     }
// };

// const singlePost = async postId => {
//     try {
//         const singlePost = await Post.findById(postId);
//         return transformPost(singlePost);
//     } catch (err) {
//         throw err;
//     }
// };

// // const user = async userId => {
// //     try {
// //     const user = await User.findById(userId);
// //             return { 
// //                 ...user._doc, 
// //                 _id: user.id,
                
// //             };
// //         } catch (err) {
// //             console.log(err);
// //         throw err;
// //         }
// // };

// const transformPost = singlePost => {
//     return {
//         ...singlePost._doc,
//         _id: singlePost.id,
//         date: dateToString(singlePost._doc.date)
//     };
// };



// exports.transformPost = transformPost;
