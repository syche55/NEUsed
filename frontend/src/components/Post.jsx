import React, { Component } from "react";
import './Post.css';
import PostItem from './PostItem';
import Grid from './Grid';
import authContext from "../auth-context";
import graphQLFetch from "../graphQLFetch.js";
import withToast from "../withToast.jsx";
import Col from "react-bootstrap/lib/Col";


class Post extends Component  {

  static contextType = authContext;

  static async fetchData(showError) {
    const query = `
              query {
                post {
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

    const data = await graphQLFetch(query, null, showError);
    return data;
  }

  

  constructor(props) {
    super(props);
    this.state = { posts: null };
  }


  componentDidMount() {
    const { posts } = this.state;
    if (posts == null) this.loadData();
  }

  async loadData() {
    const { showError } = this.props;
    const data = await Post.fetchData();
    if (data) {
      this.setState({
        posts: data.post
      });
    }
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   const { match: { params: { category: prevCate } } } = prevProps;
  //   const { match: { params: { category } } } = this.props;
  //   if (prevCate !== category) {
  //     this.loadData();
  //   }
  // }

  render() {
    const { posts } = this.state;
    console.log(posts);
    if (posts != null) {
      const postItems = posts.map((post) =>(
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
