

import React, { Component } from "react";
import './Post.css';
import PostItem from './PostItem';
import Grid from './Grid';
import authContext from "../auth-context";


class Post extends Component  {
  static contextType = authContext;
  state = {
    posts: []
  };

  componentDidMount() {
    this.fetchPost();
  }

  fetchPost = () =>{
    // this.setState({ isLoading: true });
    const requestBody = {
      query: `
              query {
                post {
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

    const token = this.context.token;
    fetch("/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        const posts = resData.data.post;
        console.log(posts.length);
        this.setState({
          posts: posts
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  

  render() {
    return (
      <Grid>
          <PostItem posts = {this.state.posts}
          />
      </Grid>
    )
}

}

export default Post;