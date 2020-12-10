// const authResolver = require('./auth');
const postResolver = require('./post');
// const userResolver = require('./user');

const rootResolver = {
    // ...authResolver,
    ...postResolver
    // ...userResolver
};

module.exports = rootResolver;