import React, { Component } from 'react';

class SignInForm extends Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSignInClick = this.handleSignInClick.bind(this)
  }

  handleInputChange(ev){
    const nextState = this.state
    nextState[ev.target.name] = ev.target.value
    this.setState(nextState)
  }

  handleSignInClick(ev){
    const userCreds = this.state
    this.props.handleSignInClick(ev, userCreds)
  }

  render() {
    return (
        <form>
          <div>
            <input type='email'
              name='email'
              placeholder='Email'
              value={this.state.email}
              onChange={this.handleInputChange} />
          </div>
          <div>
            <input type='password'
              name='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handleInputChange} />
          </div>
          <input type="submit" onClick={this.handleSignInClick} defaultValue='Log In' />
        </form>

    );
  }
}

export default SignInForm;
