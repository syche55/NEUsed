import React, { Component } from "react";
import './Post.css';
import PostItem from './PostItem';
import Grid from './Grid';
import authContext from "../auth-context";


class Post extends Component  {
  static contextType = authContext;
  state = {
    allPosts: []
  };

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
                    createdAt
                    email
                    status
                }
              }
            `,
    };
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
        const allPosts = resData.data.posts;
        console.log(allPosts);
        this.setState({
          allPosts: allPosts
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  



  render() {
    const allPosts = this.state.allPosts;
    return (
      <Grid>
          <PostItem
        src= 'https://i.ibb.co/G2Fq3kh/IMG-5645.jpg'
        title='test title'
        price='$90'
        description='test con tentttt ttt  ttt tttt ttt  ttttttt tttt ttttt tt ttt ttt tttt'
        status= {true}
      />
      <PostItem
        src= 'https://i.ibb.co/G2Fq3kh/IMG-5645.jpg'
        title='test 2'
        price='$40'
        description='test des'
        status= {false}
      />
		  <PostItem
        src= 'https://i.ibb.co/Wx3DfTw/geert-pieters-3-Rnk-Zp-Dqs-EI-unsplash.jpg'
        title='test 3'
        price='$20'
        description='testde'
        status= {true}
      />
      <PostItem
        
        title='test 4'
        price='$80'
        description='test c '
        status= {false}
      />
      </Grid>
    )
}

}

export default Post;