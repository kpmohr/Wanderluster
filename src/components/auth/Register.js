import React, { Component } from 'react';
import SignInForm from './SignInForm';
import $ from 'jquery';
import {browserHistory, Link} from 'react-router';
import actions from '../../actions/Actions';
import userStore from '../../stores/UserStore';

class Register extends Component {
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
      url: "http://localhost:3001/users.json",
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
      for(var key in data.responseJSON.errors){
        return this.setState({alert: key + ' ' + data.responseJSON.errors[key]})
      }
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
      <div className='register'>
        <h1>Register</h1>
        {this.state.alert ? alert : null}
        <SignInForm handleSignInClick={this.handleSignInClick} />
        <br/>
        <div>Already have an account? <Link to="/sign_in">Login Here</Link></div>
      </div>
    );
  }
}

export default Register;
