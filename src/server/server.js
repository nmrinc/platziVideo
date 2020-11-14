/* eslint-disable global-require */
//@o Import express, dotenv & webpack dependency
import express from 'express';
import webpack from 'webpack';
import helmet from 'helmet';
import cors from 'cors';

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
import initialState from '../frontend/data/initialState';
import config from './config';
import getManifest from './getManifest';

const serialize = require('serialize-javascript');

//@o Require the webpackConfig file.
const webpackConfig = require('../../webpack.config');

//@o Create the app server
const app = express();

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

  app.use(cors());

  app.use(helmet.contentSecurityPolicy({
    directives: {
      'default-src': ["'self'"],
      'img-src': ["'self'", 'data:', 'http://dummyimage.com', 'https://gravatar.com'],
      'media-src': ['*'],
      'script-src': ["'self'", "'sha256-ZDo5A2/f92QFG9oQoCeOEMiUtJ+sfWvpoTCBMhOOJY4='"],
      'style-src-elem': ["'self'", 'https://fonts.googleapis.com', "'sha256-UTjtaAWWTyzFjRKbltk24jHijlTbP20C1GUYaWPqg7E='"],
      'style-src': ["'self'", 'https://fonts.googleapis.com', "'sha256-UTjtaAWWTyzFjRKbltk24jHijlTbP20C1GUYaWPqg7E='"],
      'font-src': ['https://fonts.gstatic.com'],
      'upgradeInsecureRequests': [],
    },
  }));

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
const renderApp = (req, res) => {
  //@o create the store
  const store = createStore(reducer, initialState);

  //@o To pass all the initialState to the frontend, we need to preload it from the server store.
  const preloadedState = store.getState();

  /**
   * @o With renderToString create an html string from the app.
   * @o Define the Provider component and pass the created store.
   * @o Define the staticRouter and pass the properties location, taken from the req.url and context with an empty object
   * @o renderRoutes will take the array of routes and render the app.
  */
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(serverRoutes)}
      </StaticRouter>
    </Provider>,
  );

  //res.set('Content-Security-Policy', "default-src 'self'; img-src 'self' http://dummyimage.com; script-src 'self' 'sha256-AKfTUP2t87XpfDKC950UztI6WFmf7n355cz+VAt0PkI='; style-src-elem 'self' https://fonts.googleapis.com 'sha256-UTjtaAWWTyzFjRKbltk24jHijlTbP20C1GUYaWPqg7E='; font-src https://fonts.gstatic.com");

  //@o Return the setResponse func as the response from the server passing the html string created and the preloaded state.
  res.send(setResponse(html, preloadedState, req.hashManifest));
};

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
