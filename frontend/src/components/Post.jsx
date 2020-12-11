import React, { Component } from "react";
import './Post.css';
import PostItem from './PostItem';
import Grid from './Grid';
import authContext from "../auth-context";


class Post extends Component  {
  constructor(props){
    state = {
      posts: []
    };
  }

  static contextType = authContext;
  
  componentDidMount() {
    const data = this.fetchPost();
    this.setState({posts:data})
  }

  fetchPost = () =>{
    // this.setState({ isLoading: true });
    const requestBody = {
      query: `
              query {
                posts {
                    _id
                    title
                    content
                    price
                    status
                    image
                    email
                    createdAt
                }
              }
            `,
    };

    const data = await graphQLFetch(requestBody.query, null, null);
    return data;

    // const token = this.context.token;
    // fetch("/graphql", {
    //   method: "POST",
    //   body: JSON.stringify(requestBody),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => {
    //     if (res.status !== 200 && res.status !== 201) {
    //       throw new Error("Failed!");
    //     }
    //     return res.json();
    //   })
    //   .then((resData) => {
    //     const posts = resData.data.posts;
    //     console.log(posts.length);
    //     this.setState({
    //       posts: posts
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  

  render() {
    return (
      <Grid>
          <PostItem
          posts = {this.state.posts}
      />
      </Grid>
    )
}

}

export default Post;

// import React, { Component } from "react";
// import './Post.css';
// import PostItem from './PostItem';
// import Grid from './Grid';
// import authContext from "../auth-context";


// class Post extends Component  {
//   static contextType = authContext;
//   state = {
//     posts: []
//   };

//   componentDidMount() {
//     this.fetchPost();
//   }

//   fetchPost = () =>{
//     // this.setState({ isLoading: true });
//     const requestBody = {
//       query: `
//               query {
//                 posts {
//                     _id
//                     title
//                     content
//                     price
//                     status
//                     image
//                     email
//                     createdAt
//                 }
//               }
//             `,
//     };

//     const token = this.context.token;
//     fetch("/graphql", {
//       method: "POST",
//       body: JSON.stringify(requestBody),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => {
//         if (res.status !== 200 && res.status !== 201) {
//           throw new Error("Failed!");
//         }
//         return res.json();
//       })
//       .then((resData) => {
//         const posts = resData.data.posts;
//         console.log(posts.length);
//         this.setState({
//           posts: posts
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

  

//   render() {
//     return (
//       <Grid>
//           <PostItem posts = {this.state.posts}
//           />
//       </Grid>
//     )
// }

// }

// export default Post;