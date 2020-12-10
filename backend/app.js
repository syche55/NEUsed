const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

// const isAuth = require('./middleware/is-auth');




const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

const authenticate = require("./auth.js");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(function(req, res, next) {
    res.set({
        'Access-Control-Allow-Origin':'http://localhost:3000',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Credentials': 'true',
    })
    next();
});
app.use("/auth", authenticate.routes);



mongoose.connect("mongodb+srv://neuser:RKDo97Qk4X8lO2WH@cluster0.jeqmf.mongodb.net/NEUsed?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
app.listen(8000);

// app.use((req, res, next) =>{
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     if(req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }
//     next();
// });

// app.use(isAuth);

app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true
    })
);

mongoose.connect(`${process.env.MONGO_URL}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
              }).then(() => {
            app.listen(8000);

        }).catch(err => {
            console.log(err);
        });

  });
