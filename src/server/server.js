/* eslint-disable global-require */
//@o Import express, dotenv & webpack dependency
import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';
import helmet from 'helmet';

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

app.get('*', (req, res) => {
  //@o using the response pass the path where webpack serve the dist
  res.sendFile(webpackConfig.path);
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('');
    console.log(`Dev server listening on port: ${PORT}`);
    console.log('====================================');
  }
});
