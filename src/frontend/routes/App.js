import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle, faEnvelope, faKey, faUser, faPlayCircle, faPlusCircle, faTrashAlt, faSpinner, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import Layout from '../containers/Layout';
import Home from '../containers/Home';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import NotFound from '../containers/NotFound';
import Player from '../containers/Player';

library.add(faUserCircle, faEnvelope, faKey, faUser, faPlayCircle, faPlusCircle, faTrashAlt, faSpinner, faSearch, faTimes);

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/player/:id' component={Player} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default (App);
