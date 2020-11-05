//@o Import express & dotenv dependency
import express from 'express';
import dotenv from 'dotenv';

//@o Execute the config() action so dotenv seek for any .env file
dotenv.config();

//@o Create the constants for the env variables
const { ENV, PORT } = process.env;

//@o Create the app server
const app = express();

//@o Create a get call indicating the route. In this case with * will expect all the necessary routes.

if(ENV === 'dev'){
  console.log('====================================');
  console.log(`Dev environment`);
}

app.get('*', (req, res) => {
  //@o using the response pass the returned data, in this case a json.
  res.send({ hello: 'express' });
});

app.listen(PORT, (err) => {
  if (err) { console.error(err); }
  else {
    console.log('');
    console.log('Server running on http://localhost:3000');
    console.log('====================================');
  }
});