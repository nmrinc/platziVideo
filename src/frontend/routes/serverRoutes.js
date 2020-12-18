//@concept ROUTER ON SERVER SIDE

//@o Import all the routes used on the app
import Home from '../containers/Home';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import NotFound from '../containers/NotFound';
import Player from '../containers/Player';

//@a To validate login, create the const serverRoutes and pass the isLogged value. The with a ternary expression show the needed component
const serverRoutes = (isLogged) => {
  return [
    {
      exact: true,
      path: '/',
      component: isLogged ? Home : Login,
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
      component: isLogged ? Player : Login,
    },
    {
      //@o In this case will not receive a path, because it's the not found component. So will pass name instead.
      name: 'NotFound',
      component: NotFound,
    },
  ];
};

export default serverRoutes;
