

import React, { Component } from "react";
import './Post.css';
import PostItem from './PostItem';
import Grid from './Grid';
import authContext from "../auth-context";


class Post extends Component  {
  static async fetchData(match, search, showError) {
    const params = new URLSearchParams(search);
    const vars = { hasSelection: false, selectedId: 0 };
    if (params.get('status')) vars.status = params.get('status');

    const effortMin = parseInt(params.get('effortMin'), 10);
    if (!Number.isNaN(effortMin)) vars.effortMin = effortMin;
    const effortMax = parseInt(params.get('effortMax'), 10);
    if (!Number.isNaN(effortMax)) vars.effortMax = effortMax;

    const { params: { id } } = match;
    const idInt = parseInt(id, 10);
    if (!Number.isNaN(idInt)) {
      vars.hasSelection = true;
      vars.selectedId = idInt;
    }

    let page = parseInt(params.get('page'), 10);
    if (Number.isNaN(page)) page = 1;
    vars.page = page;

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
                    createdAt
                }
              }
            `;

    const data = await graphQLFetch(query, vars, showError);
    return data;
  }

  constructor(props) {
    super(props);
    this.state = { posts: null };
  }

  static contextType = authContext;

  componentDidMount() {
    this.fetchPost();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { match: { params: { category: prevCate } } } = prevProps;
    const { match: { params: { category } } } = this.props;
    if (prevCate !== category) {
      this.loadData();
    }

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
