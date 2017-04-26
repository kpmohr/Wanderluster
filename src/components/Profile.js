import React, { Component } from 'react';
// import axios from 'axios';
import $ from 'jquery';
import ToggleDisplay from 'react-toggle-display';
import ProfileUpdate from './ProfileUpdate';
import ProfileAdd from './ProfileAdd';

class Profile extends Component {

  constructor(props){
    super(props);
    this.state = {
      profiles: [],
      profile: null,
      current_user: props.profile,
      show: false
    }
  }

  onUpdate(data) {
    this.setState({
      profile: data
    })
  }

  componentDidMount() {
    $.getJSON(
      `http://localhost:3001/api/v1/profiles.json`,
      (res) => {
        console.log(res);
        console.log(this.state.current_user);
          if(res){
          res.map((profile, index) => {
            if(profile.user_id === this.state.current_user) {
              console.log(profile);
              console.log(index);
              this.setState({
                profile: profile
              })
              console.log(profile);
              return null;
            }
            return null;
          })
        }
      });
  }


  handleProfile(profile){
    console.log(profile);
    if (this.state.profile){
    return (
      <div className='profile-div'>
        <div>
          <h2>{profile.name}</h2>
        </div>
        <div className='center-div'>
          <img src={profile.image} alt="profpic" />
        </div>
        <div className='italic center'>Bio: {profile.bio}</div>
        <div className='update-toggle-button'>
          <input type="submit" value="Update your Profile?" onClick={() => this.handleClick()} />
            <ToggleDisplay show={this.state.show} >
              <ProfileUpdate profile={this.state.profile} current_user={this.state.current_user} onUpdate={this.onUpdate.bind(this)} />
            </ToggleDisplay>
          </div>
        </div>
      )
    } else {
      const profile = {name: 'Add Your Name', bio: 'Add Your Bio', image: 'http://i.imgur.com/ljXOMid.jpg', user_id: this.state.current_user};

      this.setState({
        profile: profile
      });
      return (
        <div className='profile-div'>
          <p>No Profile Info yet!</p>
          <input type='submit' onClick={() => this.handleClick()} value='Add Info!' />
          <ToggleDisplay show={this.state.show} >
              <ProfileAdd current_user={this.state.current_user} />
          </ToggleDisplay>
        </div>
        )
    }
  }

  handleClick() {
    this.setState({
      show: !this.state.show
    });
  }

  render(){
    console.log(this.state.profile);
    return(
      <div className='profile'>
        {this.handleProfile(this.state.profile)}
      </div>
    )
  }
}

export default Profile;
