import React from 'react';
import App from './App';
import ProfileUpdate from './components/ProfileUpdate';
import { BrowserRouter, Route } from 'react-router-dom';
import userStore from './stores/UserStore';

export default (
  <BrowserRouter>
    <Route exact path='/' component={App} user={userStore} >
      <Route path='/profiles/:id' component={ProfileUpdate} user={userStore}  />
    </Route>
  </BrowserRouter>
)

