//@context To use the babel capabilities on the server development require babel register

require('@babel/register')({
  //@o Pass the same configuration as the babelrc file
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ]
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