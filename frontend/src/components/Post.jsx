import React, { Component } from "react";
import './Post.css';
import PostItem from './PostItem';
import Grid from './Grid';
import authContext from "../auth-context";
import graphQLFetch from "../graphQLFetch.js";
import withToast from "../withToast.jsx";
import Col from "react-bootstrap/lib/Col";
import {MenuItem, SubMenu} from "react-pro-sidebar";
import {Link} from "react-router-dom";


class Post extends Component  {

  static contextType = authContext;

  static async fetchData(vars, showError) {
    const query = `
              query post ($category: categoryType, $email: String){
                post (category: $category, email: $email) {
                    _id
                    title
                    content
                    price
                    status
                    image
                    email
                    creator
                    createdAt
                }
              }
            `;

    const data = await graphQLFetch(query, vars, showError);
    return data;
  }


  // deletePostHandler = (postId) => {
  //   const requestBody = {
  //     query: `
  //             mutation {
  //               deletePost(postId: "${postId}"){
  //                   _id
  //                   title
  //               }
  //             }
  //           `,
  //   };
  //   fetch("/graphql", {
  //     method: "POST",
  //     body: JSON.stringify(requestBody),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       if (res.status !== 200 && res.status !== 201) {
  //         console.log(postId);
  //         throw new Error("Failed!");
  //       }
  //       window.alert("Successfully deleted!");
  //       return res.json();
  //     })
  //     .then((resData) => {
  //       this.setState((prevState) => {
  //         const updatedPosts = prevState.posts.filter((post) => {
  //           return post._id !== postId;
  //         });

  //         return { posts: updatedPosts };
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };


  constructor(props) {
    super(props);
    this.state = { posts: null };
  }


  componentDidMount() {
    const { posts } = this.state;
    if (posts == null) this.loadData();
  }

  async loadData() {
    const { showError, category } = this.props;
    let vars = {};
    const categoryDict = {
      "apparel": "Apparel",
      "electronics": "Electronics",
      "entertainment": "Entertainment",
      "family": "Family",
      "freestuff": "FreeStuff",
      "hobbies": "Hobbies",
      "other": "Other",
      "outdoor": "Outdoor"
    };
    if (category != null) {
      if (category === "yourposts") {
        vars.email = this.context.email;
      } else {
        vars.category = categoryDict[category];
      }
    }
    const data = await Post.fetchData(vars, showError);
    if (data) {
      this.setState({
        posts: data.post
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { category: prevCate } = prevProps;
    const { category } = this.props;
    if (prevCate !== category) {
      this.loadData();
    }
  }

  render() {
    const { posts } = this.state;
    console.log(posts);
    if (posts != null) {

      const postItems = posts.sort((a,b) => (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())).map((post) =>(
          <PostItem post={post} key={post._id} />
      ));
      return (
          <Grid>
            {postItems}
          </Grid>
      )
    } else {
      return <div>loading...</div>
    }

}

}

export default withToast(Post);
