import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import BrewContent from './components/BrewContent';
import UserDetail from './components/UserDetail';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import ReqAuth from './components/ReqAuth';
import CreateBrew from './components/CreateBrew';
import SubmitPost from './components/SubmitPost';
import PostList from './components/PostList';
import PostView from './components/PostView';

const createRoutes = (props) => (
  <Route path='/' component={App} >
    <IndexRoute component={BrewContent} />
    <Route path='b/:b' component={BrewContent}>
      <IndexRoute component={PostList} />
      <Route path='submit' component={ReqAuth(SubmitPost)} />
      <Route path='comments/:post' component={PostView} />
    </Route>
    <Route path='u/:u' component={UserDetail} />
    <Route path='signup' component={SignUp} />
    <Route path='signin' component={SignIn} />
    <Route path='signout' component={SignOut} />
    <Route path='brews/create' component={ReqAuth(CreateBrew)} />
    <Route path='*' component={BrewContent} />
  </Route>
);

export default createRoutes;
