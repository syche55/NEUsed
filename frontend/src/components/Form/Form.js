import React, { Component } from "react";
import authContext from "../../auth-context";
import "./Form.css";


class Form extends Component {
  constructor(props) {
    super(props);

    this.titleElRef = React.createRef();
    this.contentElRef = React.createRef();
    this.priceElRef = React.createRef();
    this.imageElRef = React.createRef();
    this.categoryElRef = React.createRef();



    // this.state = {
    //   title: null,
    //   content: null,
    //   price: null,
    //   image: null,
    //   category: null,
    //   formErrors: {
    //     title: "",
    //     content: "",
    //     price: "",
    //     image:"",
    //     category:""
    //   }
    // };
  }

  static contextType = authContext;

  handleSubmit = e => {
    e.preventDefault();
    
    const title = this.titleElRef.current.value;
    const content = this.contentElRef.current.value;
    const price = this.priceElRef.current.value;
    const image = this.imageElRef.current.value;
    const category = this.categoryElRef.current.value;
    const email = this.context.email;

    // input validation
    if (
      title.trim().length === 0 ||
      price < 0 ||
      content.trim().length === 0 ||
      image.trim().length === 0
    ) {
      return;
    }

    const requestBody = {
      query: `
        mutation {
          createPost(postInput:{title: "${title}", content: "${content}", price: ${price}, image:"${image}", category:${category}, email:"${email}"}) {
            _id
            title
            content
            price
            image
            category
            email
            createdAt
            status
          }
        }
      `
    }

      console.log(JSON.stringify(requestBody));

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"      
      },
    }).then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed!");
      }
      return res.json();
    })
    .then((resData) => {
      console.log(resData);
    })
    .catch((err) => {
      console.log(err);
    });


    // if (this.state) {
    //   console.log(`
    //     --SUBMITTING--
    //     title: ${this.state.title}
    //     content: ${this.state.content}
    //     price: ${this.state.price}
    //     image: ${this.state.image}
    //     category: ${this.state.category}
    //   `);
    // } else {
    //   console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    // }
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
                ref={this.titleElRef}
              />
            </div>
            <div className="price">
              <label htmlFor="price">Price</label>
              <input
                placeholder="$ 0.0"
                type="number"
                name="price"
                ref={this.priceElRef}

              />
            </div>
            <div className="content">
              <label htmlFor="content">Description</label>
              <textarea
                placeholder="Add Your Description"
                type="text"
                name="content"
                rows={3}
                ref={this.contentElRef}

              />
            </div>
            <div className="image">
              <label htmlFor="image">Image URL</label>
              <input
                placeholder="Image URL"
                type="text"
                name="image"
                ref={this.imageElRef}

              />
            </div>
            <div className="category">
              <label htmlFor="category">Category</label>
              <select id="categories" name="categories" ref={this.categoryElRef}
>
                <option value="Apparel">Apparel</option>
                <option value="Electronics">Electronics</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Family">Family</option>
              </select>
            </div>
            <div className="email">
            <input type="hidden" value={this.context.email}></input>
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