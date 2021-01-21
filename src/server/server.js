/* eslint-disable global-require */
//@o Import express, dotenv & webpack dependency
import express from 'express';
import webpack from 'webpack';
import helmet from 'helmet';
import cors from 'cors';

//--##

//@context SSR Auth dependencies
import cookieParser from 'cookie-parser';
import boom from '@hapi/boom';
import passport from 'passport';
import axios from 'axios';

//--##

//@concept CONVERT COMPONENTS TO STRING TO CREATE SERVER SIDE RENDERING.
//@o Import React Dependencies
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import serverRoutes from '../frontend/routes/serverRoutes';
import reducer from '../frontend/reducers';
import config from './config';
import getManifest from './getManifest';

const serialize = require('serialize-javascript');

//@o Require the webpackConfig file.
const webpackConfig = require('../../webpack.config');

//@o Create the app server
const app = express();

//--##

//@context SSR Auth passport and parsers
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//@concept Basic Strategy
require('./utils/auth/strategies/basic');

//--##

if (config.dev) {
  console.log('====================================');
  console.log(`${process.env.ENV} environment`);

  //@o Require the webpack-dev-middleware
  const webpackDevMiddleware = require('webpack-dev-middleware');
  //@o Require the webpack-hot-middleware
  const webpackHotMiddleware = require('webpack-hot-middleware');
  //@o Define a compiler const and pass the webpack dependency with the webpack Config file.
  const compiler = webpack(webpackConfig);
  //@o Define a const for the webpack serverConfig with the properties from webpackDevMiddleware.
  //@o As we're going to use hot module replacement pass it as true.
  //@context Webpack HotModuleReplacementPlugin let, when we're on dev env, reload the app every time there's a change on the code.
  //! With webpack 5 configuration this way will throw an error 'cause the options schema doesn't have a port or hot into.
  //const serverConfig = { port: PORT, hot: true };
  const serverConfig = {
    publicPath: webpackConfig.output.publicPath,
  };

  //@o Define and use the webpackDevMiddleware to the app
  app.use(webpackDevMiddleware(compiler, serverConfig));
  //@o Define and use the webpackHotMiddleware to the app
  app.use(webpackHotMiddleware(compiler));
} else {
  console.log('====================================');
  console.log(`${process.env.ENV} environment`);

  //@concept middleware to read manifest.json
  app.use((req, res, next) => {
    //@o if hashManifest its empty, return the getManifest function to populate it.
    if (!req.hashManifest) req.hashManifest = getManifest();
    next();
  });

  //@concept Helmet helps you secure your Express apps by setting various HTTP headers.
  app.use(helmet());

  app.use(helmet.contentSecurityPolicy({
    directives: {
      'default-src': ["'self'"],
      'img-src': ["'self'", 'data:', 'http://dummyimage.com', 'https://gravatar.com'],
      'media-src': ['*'],
      'script-src': ["'self'", "'unsafe-inline' 'unsafe-eval'"],
      'style-src-elem': ["'self'", 'https://fonts.googleapis.com', "'sha256-UTjtaAWWTyzFjRKbltk24jHijlTbP20C1GUYaWPqg7E='"],
      'style-src': ["'self'", 'https://fonts.googleapis.com', "'sha256-UTjtaAWWTyzFjRKbltk24jHijlTbP20C1GUYaWPqg7E='"],
      'font-src': ['https://fonts.gstatic.com'],
      'upgradeInsecureRequests': [],
    },
  }));

  app.use(cors());

  //@o With this sentence, declare a public path where the production dist will be served.
  app.use(express.static(`${__dirname}/public`));

}

//@o setResponse will receive the html string from renderApp func and will return it into the server html.
//@o Additionally we can pass the preloaded State so we can consume it by the client side.
const setResponse = (html, preloadedState, manifest) => {

  //@o Define constants where if there's a manifest, pass the names it contains so can load if it's in production mode.
  const mainStyles = manifest ? manifest['main.css'] : 'assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
  const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';

  return (`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Platzi Video</title>
        <link rel="stylesheet" href="${mainStyles}" type="text/css" />
      </head>
      <body>
        <div id="App">${html}</div>
        <script>window.__PRELOADED_STATE__ = ${serialize(preloadedState)}</script>
        <script src="${mainBuild}" type="text/javascript"></script>
        <script src="${vendorBuild}" type="text/javascript"></script>
      </body>
    </html>
  `);
};

//@o Create a function that will convert everything to a String and then Render the app
const renderApp = async (req, res) => {
  //@a Declare the initial state variable that will be filled according to the login.
  let initialState;

  //@a Get the user info from the cookie.
  const { email, name, id, token } = req.cookies;

  //@a Make a try/catch with the consult with axios adding the header with the token.
  try {
    let movieList = await axios({
      url: `${config.apiUrl}/api/movies`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'get',
    });

    //@a As axios expose the res as a data. We need to declare the route to obtain it.
    movieList = movieList.data.data;

    //--## User movies fetch
    let userMovies = await axios({
      url: `${config.apiUrl}/api/user-movies/?userId=${id}`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'get',
    });

    userMovies = userMovies.data.data;

    let myList = [];

    userMovies.forEach((item) => {
      myList = [...myList, ...movieList.filter((el) => el._id === item.movieId)];
    });

    for (let i = 0; i < myList.length; i++) myList[i]._uId = userMovies[i]._id;

    //--## /User movies fetch

    //@a build the initial state with the response, filtering the content.
    initialState = {
      user: { email, name, id },
      playing: {},
      findings: [],
      myList: myList || [],
      trends: movieList.filter((movie) => movie.contentRating === 'PG' && movie._id),
      originals: movieList.filter((movie) => movie.contentRating === 'G' && movie._id),
    };
  } catch (e) {
    initialState = {
      user: {},
      playing: {},
      findings: [],
      myList: [],
      trends: [],
      originals: [],
    };
  }

  //@o create the store
  const store = createStore(reducer, initialState);

  //@o To pass all the initialState to the frontend, we need to preload it from the server store.
  const preloadedState = store.getState();

  //@a Define the isLogged const.
  const isLogged = (initialState.user.id);

  /**
   * @o With renderToString create an html string from the app.
   * @o Define the Provider component and pass the created store.
   * @o Define the staticRouter and pass the properties location, taken from the req.url and context with an empty object
   * @o renderRoutes will take the array of routes and render the app.
   * @a Pass the isLogged const to the serverRoutes.
  */
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(serverRoutes(isLogged))}
      </StaticRouter>
    </Provider>,
  );

  //res.set('Content-Security-Policy', "default-src 'self'; img-src 'self' http://dummyimage.com; script-src 'self' 'sha256-AKfTUP2t87XpfDKC950UztI6WFmf7n355cz+VAt0PkI='; style-src-elem 'self' https://fonts.googleapis.com 'sha256-UTjtaAWWTyzFjRKbltk24jHijlTbP20C1GUYaWPqg7E='; font-src https://fonts.gstatic.com");

  //@o Return the setResponse func as the response from the server passing the html string created and the preloaded state.
  res.send(setResponse(html, preloadedState, req.hashManifest));
};

//--##

//@context SSR Auth routes

//@concept Basic Strategy
require('./utils/auth/strategies/basic');

const { THIRTY_DAYS_IN_SEC, TWO_HOURS_IN_SEC } = require('./utils/time');

app.post('/auth/sign-in', async (req, res, next) => {
  //@a Obtain the rememberMe attribute from the req body
  const { rememberMe } = req.body;

  //@a Generate the req with passport and a basic strategy
  passport.authenticate(
    'basic', (error, data) => {
      try {
        if (error || !data) { next(boom.unauthorized()); }

        req.login(data, { session: false }, async (err) => {
          if (err) { next(err); }

          const { token, ...user } = data;

          res.cookie('token', token, {
            httpOnly: !config.dev,
            secure: !config.dev,
            maxAge: rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC,
          });

          res.status(200).json(user);
        });
      } catch (e) {
        next(e);
      }
    },
  )(req, res, next);
});

app.post('/auth/sign-up', async (req, res, next) => {
  const { body: user } = req;

  try {
    //@a declare as a constant the call
    const userData = await axios({
      url: `${config.apiUrl}/api/auth/sign-up`,
      method: 'post',
      data: {
        //@a pass the object with the info that will be obtained
        'email': user.email,
        'name': user.name,
        'password': user.password,
      },
    });

    //@a As the res status json, pass an object with the info obtained from the req and userData
    res.status(201).json({
      name: req.body.name,
      email: req.body.email,
      id: userData.data.id,
    });
  } catch (e) {
    next(e);
  }
});

//@context User Movies admin

app.post('/user-movies', async (req, res, next) => {

  try {
    //@a Obtain userMovie from the request body
    const { body: userMovie } = req;
    //@a Obtain the token from the request cookies.
    const { id, token } = req.cookies;

    const { data, status } = await axios({
      url: `${config.apiUrl}/api/user-movies`,
      //@a Add a header of authorization with a bearer token type, passing the token obtained from the cookie.
      headers: { Authorization: `Bearer ${token}` },
      method: 'post',
      data: {
        'userId': id,
        ...userMovie,
      },
    });

    //@a If the res status it's different to 201, return a bad implementation boom error
    //@o Commonly return an HTTP 500 code. Meaning that something has gone wrong on the website's server, but the server could not be more specific on what the exact problem is.
    if (status !== 201) { return next(boom.badImplementation()); }

    res.status(201).json(data);
  } catch (e) {
    next(e);
  }
});

app.delete('/user-movies/:userMovieId', async (req, res, next) => {
  try {
    //@a Obtain userMovieId from the request params
    const { userMovieId } = req.params;
    const { token } = req.cookies;

    const { data, status } = await axios({
      //@a Add the movie id obtained from the params to the url
      url: `${config.apiUrl}/api/user-movies/${userMovieId}`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'delete',
    });

    if (status !== 200) { return next(boom.badImplementation()); }

    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
});

//--##

//@o Create a get call indicating the route. In this case with * will expect all the necessary routes.
//@o Pass the renderApp func as the get callback
app.get('*', renderApp);

app.listen(config.port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('');
    console.log(`Server listening on port: ${config.port}`);
    console.log('====================================');
  }
});
