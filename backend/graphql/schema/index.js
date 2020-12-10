const { buildSchema } = require('graphql');


module.exports = buildSchema(`
type Post {
    _id: ID!
    title: String!
    content: String
    price: Float
    author: String
    status: Boolean
    image: String
    category: categoryType
    email: String
    createdAt: String
    updatedAt: String
}

type User {
    _id: ID!
    signedIn: Boolean!
    givenName: String
    name: String
    email: String
}

enum categoryType {
    Apparel
    Electronics
    Entertainment
    Family
    FreeStuff
    Hobbies
    Other
    Outdoor
}

input PostInput {
    title: String!
    content: String
    price: Float
    status: Boolean
    image: String
    category: categoryType = Other
}

input PostUpdateInput {
    title: String
    content: String
    price: Float
    status: Boolean
    image: String
    category: categoryType
}

type RootQuery {
    user: [User!]!
    post: [Post!]!
}

type RootMutation {
    createPost(postInput: PostInput): Post
    deletePost(postId: ID!): Post
    updatePost(postId: ID!, postUpdateInput: PostUpdateInput): Post
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)

