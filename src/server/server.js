//@o Import express dependency
import express from 'express';

//@o Create the app server
const app = express();

//@o Create a get call indicating the route. In this case with * will expect all the necessary routes.
app.get('*', (req, res) => {
  //@o using the response pass the returned data, in this case a json.
  res.send({ hello: 'express' });
});

app.listen(3000, (err) => {
  if (err) { console.error(err); }
  else {
    console.log('====================================');
    console.log('Server running on http://localhost:3000');
    console.log('====================================');
  }
});