import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './../components/Layout';
import Home from './../containers/Home';
import Login from './../containers/Login';
import Signup from './../containers/Signup';
import NotFound from './../containers/NotFound';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle, faEnvelope, faKey, faUser, faPlayCircle, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
library.add( faUserCircle, faEnvelope, faKey, faUser, faPlayCircle, faPlusCircle, faMinusCircle );

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
