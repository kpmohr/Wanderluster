import React, { Component } from 'react';
import '../stylesheets/App.css';
import ToggleDisplay from 'react-toggle-display';
import TripsAll from './TripsAll';
import axios from 'axios';


class GoogleMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      linkInput: null,
      linkID: null,
      linkEmbed: null,
      show: false,
      current_user: props.current_user,
      tripId: null
    }
  }

  handleAdd(e){
    e.preventDefault();
    console.log(this.state.tripId);
    console.log(this.state.linkEmbed);
    if(this.state.tripId && this.state.linkEmbed){
      const map = {mapLink: this.state.linkEmbed, trip_id: this.state.tripId }
    axios.post(`http://localhost:3001/api/v1/maps`, map: map, {
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

  onAdd(data) {
    this.setState({
      tripId: data
    })
  }

  searchInput(e){
    const link = e.target.value;
    console.log(link);
    const splitId = /(=[a-zA-Z0-9-]*)/gim
    const idArray = link.split(splitId);
    const id = idArray[1];
    console.log(id);
    this.setState({
      linkInput: e.target.value,
      linkId: id
    })
  }

  searchSubmit(e){
    e.preventDefault()

    console.log(this.state.linkInput);
    console.log(this.state.linkId);
    const urlMap = `https://www.google.com/maps/d/embed?mid${this.state.linkId}`;
    console.log(urlMap);

    this.setState({
      linkEmbed: urlMap
    })
  }

  renderMap(){
    if (this.state.linkEmbed) {
        return (
          <iframe src={this.state.linkEmbed} width="640" height="480"></iframe>
        )
      }
    }

  handleClick() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    return(
      <div className='sub-div'>
        <div className='center'>
          <div onClick={() => this.handleClick()} className='hexagon'>
            <span>
              <div className='button-toggle'>What's the Plan?
                <div className='small-text'>(Google - My Map)</div>
              </div>
            </span>
          </div>
        </div>
        <ToggleDisplay show={this.state.show} className='hexagonBig'>
          <div className='div-toggle'>
            <div>
              <div><strong>Instructions:</strong></div>
              <div>1. Create a google map you can share with "My Maps" to show everyone where you will be traveling on your trip! Create one <a href='https://www.google.com/maps/d/u/0/'>here</a>.</div>
              <div>2. Click the "+ Create A New Map" and when you are finished copy the link and paste it below!</div>
              <div><a href='https://www.google.com/maps/d/u/0/edit?mid=1J0Tc8cNqnh36YNNTmmtui4MwAZ4&ll=46.375311481412226%2C4.04296875&z=5'>Here is an example!</a></div>
            </div>
            <div>
              <TripsAll current_user={this.state.current_user} onAdd={this.onAdd.bind(this)} />
              <input type='submit' value='Save Map' onChange={(e) =>this.handleAdd(e)} />
            </div>
            <div>{this.renderMap()}</div>
            <div>
              <form onSubmit={(e)=> this.searchSubmit(e)}>
                <input type='text' placeholder='My Map Link' onChange={(e) =>this.searchInput(e)} />
                <input type='submit' value='Show Map' />
              </form>
            </div>
          </div>
        </ToggleDisplay>
      </div>
      )
  }
}


export default GoogleMap;
