import authContext from "../../auth-context";
import "./Form.css";
import withToast from "../../withToast.jsx";
import React from "react";
import graphQLFetch from "../../graphQLFetch";


class UpdateForm extends React.Component {
    static async fetchData(vars, showError) {
        const query = `
              query post ($_id: ID){
                post (_id: $_id) {
                    _id
                    title
                    content
                    price
                    status
                    image
                    email
                    category
                    creator
                    createdAt
                }
              }
            `;

        const data = await graphQLFetch(query, vars, showError);
        return data;
    }

    constructor(props) {
        super(props);

        this.titleElRef = React.createRef();
        this.contentElRef = React.createRef();
        this.priceElRef = React.createRef();
        this.imageElRef = React.createRef();
        this.categoryElRef = React.createRef();
        this.statusElRef = React.createRef();

        this.state = {
            post: null,
            title: "",
            content: "",
            price: 0,
            image: "",
            category: "",
            status: true,
            formErrors: {
            title: "",
            content: "",
            price: "",
            image:"",
            category:""
          }
        };

        this.onChange = this.onChange.bind(this);
    }

    refreshPage() {
        setTimeout(() => window.location.replace("/discover/"), 1000);
    }

    static contextType = authContext;

    componentDidMount() {
        const { post } = this.state;
        if (post == null) this.loadData();
    }

    async loadData() {
        const { showError } = this.props;
        let vars = {};
        const { match: { params: { id } } } = this.props;
        vars._id = id;
        const data = await UpdateForm.fetchData(vars, showError);
        if (data) {
            this.setState({
                post: data.post[0]
            });
        }
        const { post } = this.state;
        for (let name in post) {
            this.setState( { [name]: post[name]} );
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        const title = this.titleElRef.current.value;
        const content = this.contentElRef.current.value;
        const price = this.priceElRef.current.value;
        const image = this.imageElRef.current.value;
        const category = this.categoryElRef.current.value;
        const status = this.statusElRef.current.value;
        const id = this.state.post._id;

        if (this.validate({title, content, price, image})) {



            const requestBody = {
                query: `
        mutation {
          updatePost(postId: "${id}", postUpdateInput:{title: "${title}", content: "${content}", price: ${price}, status: ${status}, image:"${image}", category:${category}}) {
            _id
            title
            content
            price
            image
            category
            email
            createdAt
            status
            creator
          }
        }
      `
            }
            console.log(requestBody);
            const { showSuccess, showError } = this.props;

            fetch("http://localhost:8000/graphql", {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((res) => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error("Failed!");
                    showError("Update Failed!")
                }
                return res.json();
            })
                .then((resData) => {
                    console.log(resData);
                    showSuccess("Successfully updated post!")
                })
                .catch((err) => {
                    console.log(err);
                });

        }
        this.refreshPage();
    };

    validate (args) {
        const { showError } = this.props;
        // input validation
        if (
            args.title.trim().length === 0 ||
            args.price === null ||
            args.price < 0 ||
            args.content.trim().length === 0 ||
            args.image.trim().length === 0
        ) {
            showError("Bad input!");
            return false;
        }
        return true;
    }

    onChange(event, naturalValue) {
        const { name, value: textValue } = event.target;
        const value = naturalValue === undefined ? textValue : naturalValue;
        this.setState({ [name]: value });
    }

    render() {
        const { post, title, content, price, status, image, category } = this.state;
        if (post == null) {
            return(
                <div>loading...</div>
            );
        }
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
                                value={title}
                                ref={this.titleElRef}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="price">
                            <label htmlFor="price">Price</label>
                            <input
                                placeholder="$ 0.0"
                                type="number"
                                name="price"
                                value={price}
                                ref={this.priceElRef}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="content">
                            <label htmlFor="content">Description</label>
                            <textarea
                                placeholder="Add Your Description"
                                type="text"
                                name="content"
                                rows={3}
                                value={content}
                                ref={this.contentElRef}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="image">
                            <label htmlFor="image">Image URL</label>
                            <input
                                placeholder="Image URL"
                                type="text"
                                name="image"
                                value={image}
                                ref={this.imageElRef}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="category">
                            <label htmlFor="category">Category</label>
                            <select id="category" name="category" value={category} ref={this.categoryElRef} onChange={this.onChange}>
                                <option value="Apparel">Apparel</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Family">Family</option>
                                <option value="FreeStuff">FreeStuff</option>
                                <option value="Hobbies">Hobbies</option>
                                <option value="Other">Other</option>
                                <option value="Outdoor">Outdoor</option>
                            </select>
                        </div>
                        <div className="status">
                            <label htmlFor="status">Status</label>
                            <select id="status" name="status" value={status} ref={this.statusElRef} onChange={this.onChange}>
                                <option value={true}>Available</option>
                                <option value={false}>Sold Out</option>
                            </select>
                        </div>

                        <div className="createPost">
                            <button type="submit">Edit Post</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withToast(UpdateForm);
