import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './../components/Layout';
import Home from './../containers/Home';
import Login from './../containers/Login';
import Signup from './../containers/Signup';
import NotFound from './../containers/NotFound';


const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;
