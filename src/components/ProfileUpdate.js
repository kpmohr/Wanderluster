import React, { Component } from 'react';
// import './stylesheets/App.css';
// import {browserHistory} from 'react-router';
// import update from 'react-addons-update';
// import $ from 'jquery';
import axios from 'axios';
// import actions from '../actions/Actions';
// import Profile from './Profile';


class ProfileUpdate extends Component {

  constructor(props){
    super(props);
    this.state = {
      profile: props.profile,
      current_user: props.current_user
    }
  }

  updateName(e) {
        const profile = this.state.profile;
        profile.name = e.target.value;

      this.setState({
        profile: profile
      });
  }

  updateBio(e) {
        const profile = this.state.profile;
        profile.bio = e.target.value;

      this.setState({
        profile: profile
      });
  }

  updateImage(e) {
        const profile = this.state.profile;
        profile.image = e.target.value;

      this.setState({
        profile: profile
      });
  }

  handleUpdate(e){
    const profile = this.state.profile;
    console.log(profile.id);
    e.preventDefault();
    if(profile){
    axios.put(`http://localhost:3001/api/v1/profiles/${profile.id}`, profile: profile, {
      headers: {
        "Content-Type": "application/json"
    }}
    )
    .then((res) => {
     console.log(res);
    })
    .catch((error)=>{
        console.log('error: ', error)
       })
    }
  }

    update() {
      this.props.onUpdate(this.state.profile)
    }

  renderForm() {
    if(this.state.profile) {
      console.log("profile:");
      console.log(this.state.profile);
      console.log("profile id:");
      console.log(this.state.profile.id);
      console.log("current user:");
      console.log(this.state.current_user);
      return (
        <div>
          <form onSubmit={(e) => this.handleUpdate(e)} onClick={this.update.bind(this)} className='form-layout'>
              <input type='text' value={this.state.profile.name} onChange={this.updateName.bind(this)} />
              <input type='textarea' value={this.state.profile.bio} onChange={this.updateBio.bind(this)} />
              <input type='text' value={this.state.profile.image} onChange={this.updateImage.bind(this)} />
              <input type='submit' value='Save Changes' />
          </form>
        </div>
      );
    }
  }


  render() {
    return (
      <div>
        {this.renderForm()}
      </div>
    );
  }
}

export default ProfileUpdate;
