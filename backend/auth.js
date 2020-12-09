const Router = require('express');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const routes = new Router();

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET

routes.use(bodyParser.json());

// sign in user route
routes.post('/signin', async (req, res) => {
    // check on JWT_SECRET first
    if (!JWT_SECRET) {
        res.status(500).send('Missing JWT_SECRET. Refusing to authenticate');
      }

    const googleToken = req.body.google_token;
    // console.log("hit the post route, google token is:", googleToken);
    if (!googleToken) {
      res.status(400).send({ code: 400, message: 'Token is missing' });
      return;
    }
    const client = new OAuth2Client();
    let payload;
    try {
      const ticket = await client.verifyIdToken({ idToken: googleToken });
      payload = ticket.getPayload();
    } catch (error) {
      res.status(403).send('Invalid credentials');
    }
    // ****Should set up in graphql somewhere??***
    const { given_name: givenName, name, email } = payload;
    const credentials = {
      signedIn: true, givenName, name, email,
    };

    // add in cookie token
    const token = jwt.sign(credentials, JWT_SECRET);
    res.cookie('jwt', token, { httpOnly: true });

    res.json(credentials);
  });


// send back current user route
routes.post('/user', (req, res) => {
    res.send(getUser(req));
});


// sign out user route
routes.post('/signout', async (req, res) => {
    res.clearCookie('jwt');
    res.json({ status: 'ok' });
  });


// get current user
function getUser(req) {
    const token = req.cookies.jwt;
    
    if (!token) return { signedIn: false };
    try {
      const credentials = jwt.verify(token, JWT_SECRET);
      return credentials;
    } catch (error) {
      return { signedIn: false };
    }
}

// sign in resolver
function mustBeSignedIn(resolver) {
    return (root, args, { user }) => {
      if (!user || !user.signedIn) {
        throw new AuthenticationError('You must be signed in');
      }
      return resolver(root, args, { user });
    };
  }


module.exports = { routes, getUser, mustBeSignedIn};