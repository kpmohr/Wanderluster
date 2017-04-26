import React, { Component } from 'react';
// import axios from 'axios';
import $ from 'jquery';


class Trip extends Component {

  constructor(props){
    super(props);
    this.state = {
      trips: [],
      trip: null,
      tripId: null,
      current_user: props.current_user
    }
  }

  componentDidMount() {
    $.getJSON(
      `http://localhost:3001/api/v1/trips.json`,
      (res) => {
        console.log(res);
        console.log(res.object);
        console.log(this.state.profile);
              this.setState({
                trips: res
              })
        });
  }

    update(id) {
      this.props.onAdd(this.state.tripId)
    }

  handleTrips(trips){
    console.log(trips);
    if(this.state.trips){
      return this.state.trips.map((trip, index) => {
            console.log(trip.user_id);
            console.log(this.state.current_user);
        if(trip.user_id === this.state.current_user){
          this.setState({
              tripId: trip.user_id
          })
          console.log(trip);
        return (
          <option key={index} value={trip.id} onChange={this.update.bind(this)}>{trip.tripName}</option>
        )
      } return null;
      })
    } else {
      return (
          <option>No Trips Yet!</option>
        )
    }
  }

  render(){
    console.log(this.state.trips);
    // console.log(this.state.trips);
    return(
      <div className='select-trip'>
        <select>
          {this.handleTrips()}
        </select>
      </div>
    )
  }
}

export default Trip;
