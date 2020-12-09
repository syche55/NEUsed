const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');

const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());


// mongoose.connect(`${process.env.MONGO_URL}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }).then(() => {
// app.listen(8000);

// }).catch(err => {
// console.log(err);
// });
app.listen(8000, ()=>{
    console.log(`Server is running on port: 8000`);
});

app.use(
    '/graphql',
    graphqlHTTP({
        // schema: graphQlSchema,
        // rootValue: graphQlResolvers,
        graphiql: true
    })
);