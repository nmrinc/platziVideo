//@context To use the babel capabilities on the server development require babel register

//@o Ask the server to ignore all the css calls as we can't render any of them from the server side
require('ignore-styles');

//@a Require @babel/polyfill
//@o This dependency helps to work with async/await without browser version problems
require('@babel/polyfill');

require('@babel/register')({
  //@o Pass the same configuration as the babelrc file
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
});

//@concept Require Asset require hook. That lets bind in real time routes that being referenced on the app from node.
//@o Pass as properties the extensions of the files that will be static hosted. And how will be named.
require('asset-require-hook')({
  extensions: ['jpg', 'png', 'svg', 'gif'],
  name: '/assets/[hash].[ext]',
});

//@o Require the server file where will be all the logic of the server
require('./server');

/**
 * @concept
 * Express server loaded on port 3000
 * ##--
 * @context
 * After creating the script on package
 * @tst
 * "start:dev": "nodemon src/server/index"
 * @o
 * Run it on terminal
 * @tst
 * >npm run start:dev
*/
