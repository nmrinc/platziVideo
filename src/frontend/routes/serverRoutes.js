//@concept ROUTER ON SERVER SIDE

//@o Import all the routes used on the app
import Home from '../containers/Home';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import NotFound from '../containers/NotFound';
import Player from '../containers/Player';

//@o This will be an array of the same routes defined on the app
const routes = [
  //@o Define the routes as an object with the same properties as the component of the app routes

  {
    exact: true,
    path: '/',
    component: Home,
  },
  {
    exact: true,
    path: '/login',
    component: Login,
  },
  {
    exact: true,
    path: '/signup',
    component: Signup,
  },
  {
    exact: true,
    path: '/player/:id',
    component: Player,
  },
  {
    //@o In this case will not receive a path, because it's the not found component. So will pass name instead.
    name: 'NotFound',
    component: NotFound,
  },

];

export default routes;
