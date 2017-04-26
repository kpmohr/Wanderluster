import React, { Component } from 'react';
import './stylesheets/App.css';
import {browserHistory} from 'react-router';
import $ from 'jquery';
import userStore from './stores/UserStore';
import actions from './actions/Actions';
import TimeZone from './components/TimeZone';
import Currency from './components/Currency';
import Translator from './components/Translator';
import GoogleMap from './components/GoogleMap';
import Profile from './components/Profile';
import Trip from './components/Trip';


class App extends Component {

  constructor(){
    super()
    this.state = {
      current_user: userStore.getState(),
      profile: null
    }
    this.logout = this.logout.bind(this)
  }

  logout(){
    $.ajax({
      method: "DELETE",
      url: "http://localhost:3001/users/sign_out.json"
    })
    .done(() => {
      actions.logoutUser()
      browserHistory.push('/sign_in')
    })
  }

  componentWillMount(){
    if (!userStore.getState()){
      browserHistory.push('/sign_in')
    }
  }

  nav() {
    return (
      <nav>
        <div>
          <h1>Wanderluster...</h1>
        </div>
        <div>
            <input className='logout' type='submit' onClick={this.logout} value='Log Out' />
        </div>
      </nav>
    );
  }



  render() {
    console.log("current user id:")
    console.log(this.state.current_user.id);
    return (
      <div>
        <div>
          {this.nav()}
        </div>
        <div className='main-container'>
          <div className='buttons-container'>
            <Currency />
            <TimeZone />
            <Translator />
            <GoogleMap current_user={this.state.current_user.id} />
            <Trip current_user={this.state.current_user.id} />
          </div>
          <div>
            <Profile profile={this.state.current_user.id} />
          </div>
        </div>
        <div>
        </div>
      </div>
    );
  }
}

export default App;
