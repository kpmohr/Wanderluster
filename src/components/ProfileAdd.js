import React, { Component } from 'react';
import axios from 'axios';


class ProfileAdd extends Component {

  constructor(props){
    super(props);
    this.state = {
      profile: null,
      current_user: props.current_user
    }
  }

  addName(e) {
        const profile = this.state.profile;
        profile.name = e.target.value;

      this.setState({
        profile: profile
      });
  }

  addBio(e) {
        const profile = this.state.profile;
        profile.bio = e.target.value;

      this.setState({
        profile: profile
      });
  }

  addImage(e) {
        const profile = this.state.profile;
        profile.image = e.target.value;

      this.setState({
        profile: profile
      });
  }

  addUserId() {
        const profile = this.state.profile;
        profile.user_id = this.state.current_user;

      this.setState({
        profile: profile
      });
  }

  handleAdd(e){
    const profile = this.state.profile;
    console.log(profile.id);
    e.preventDefault();
    if(profile){
    axios.post(`http://localhost:3001/api/v1/profiles.json`, profile: profile, {
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

  renderForm() {
    if(this.state.profile) {
      console.log("profile:");
      console.log(this.state.profile);
      console.log("current user:");
      console.log(this.state.current_user);
      return (
        <div>
          <form onSubmit={(e) => this.handleAdd(e)} >
              <input type='text' value={this.state.profile.name} onChange={this.addName.bind(this)} />
              <input type='textarea' value={this.state.profile.bio} onChange={this.addBio.bind(this)} />
              <input type='text' value={this.state.profile.image} onChange={this.addImage.bind(this)} />
              <input type='submit' value='Save Changes' />
          </form>
        </div>
      );
    }
  }


  render() {
    console.log("current user:");
    console.log(this.state.current_user);
    return (
      <div>
        {this.renderForm()}
      </div>
    );
  }
}

export default ProfileAdd;
