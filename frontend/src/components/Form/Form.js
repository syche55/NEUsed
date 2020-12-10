import React, { Component } from "react";
import "./Form.css";


class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: null,
      content: null,
      price: null,
      image: null,
      category: null,
      formErrors: {
        title: "",
        content: "",
        price: "",
        image:"",
        category:""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.state) {
      console.log(`
        --SUBMITTING--
        title: ${this.state.title}
        content: ${this.state.content}
        price: ${this.state.price}
        image: ${this.state.image}
        category: ${this.state.category}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };


  render() {
 
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Add Your Product</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="title">
              <label htmlFor="title">Name / Title</label>
              <input
                placeholder="Item Name"
                type="text"
                name="title"
              />
            </div>
            <div className="price">
              <label htmlFor="price">Price</label>
              <input
                placeholder="$ 0.0"
                type="text"
                name="price"
              />
            </div>
            <div className="content">
              <label htmlFor="content">Description</label>
              <textarea
                placeholder="Add Your Description"
                type="text"
                name="content"
                rows={3}
              />
            </div>
            <div className="image">
              <label htmlFor="image">Image URL</label>
              <input
                placeholder="Image URL"
                type="text"
                name="image"
              />
            </div>
            <div className="category">
              <label htmlFor="category">Category</label>
              <select id="categories" name="categories">
                <option value="ideas">Ideas</option>
                <option value="artworks">Artworrks</option>
                <option value="spots">Spots Around You</option>
                <option value="events">Events</option>
              </select>
            </div>
            <div className="createPost">
              <button type="submit">Add Post Now</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;