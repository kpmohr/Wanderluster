import React, { Component } from 'react';
import SignInForm from './SignInForm';
import $ from 'jquery';
import {browserHistory, Link} from 'react-router';
import actions from '../../actions/Actions';
import userStore from '../../stores/UserStore';

class SignIn extends Component {
  constructor(){
    super()
    this.state = {
      alert: null
    }
    this.handleSignInClick = this.handleSignInClick.bind(this)
  }

  handleSignInClick(event, userCreds){
    event.preventDefault()
    $.ajax({
      method: "POST",
      url: "http://localhost:3001/users/sign_in.json",
      data: {
        user: {
          email: userCreds.email,
          password: userCreds.password
        }
      }
    })
    .done(user => {
      actions.loginUser(user)
      browserHistory.push('/')
    })
    .catch(data => {
      this.setState({alert: data.responseJSON.error})
    })
  }

  componentWillMount(){
      if (userStore.getState()){
        browserHistory.push('/')
      }
  }

  componentDidMount(){
    this.removeListener = userStore.addListener(user => {
      this.setState({user})
    })
  }

  componentWillUnmount(){
    this.removeListener()
  }

  render() {
    const alert = (
      <div className="alert">{this.state.alert}</div>
    );

    return (
      <div className='sign-in'>
        <h1>Log In</h1>
        {this.state.alert ? alert : null}
        <SignInForm handleSignInClick={this.handleSignInClick} />
        <br/>
        <div>New to this app? <Link to="/register">Register Here</Link></div>
      </div>
    );
  }
}

export default SignIn;
