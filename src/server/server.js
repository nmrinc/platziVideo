/* eslint-disable global-require */
//@o Import express, dotenv & webpack dependency
import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';
import helmet from 'helmet';

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

//@o Execute the config() action so dotenv seek for any .env file
dotenv.config();

//@o Create the constants for the env variables
const { ENV, PORT } = process.env;

//@o Require the webpackConfig file.
const webpackConfig = require('../../webpack.config');

//@o Create the app server
const app = express();
app.use(helmet.hidePoweredBy());

//@o Create a get call indicating the route. In this case with * will expect all the necessary routes.

if (ENV === 'dev') {
  console.log('====================================');
  console.log('Dev environment');

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
}

//@o setResponse will receive the html string from renderApp func and will return it into the server html.
//@o Additionally we can pass the preloaded State so we can consume it by the client side.
const setResponse = (html, preloadedState) => {
  return (`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Platzi Video</title>
        <link rel="stylesheet" href="assets/app.css" type="text/css" />
      </head>
      <body>
        <div id="App">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="assets/app.js" type="text/javascript"></script>
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

  //@o Return the setResponse func as the response from the server passing the html string created and the preloaded state.
  res.send(setResponse(html, preloadedState));
};

//@o Pass the renderApp func as the get callback
app.get('*', renderApp);

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('');
    console.log(`Dev server listening on port: ${PORT}`);
    console.log('====================================');
  }
});
