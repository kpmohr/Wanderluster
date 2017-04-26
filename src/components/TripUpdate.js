import React, { Component } from 'react';
import axios from 'axios';


class TripUpdate extends Component {

  constructor(props){
    super(props);
    this.state = {
      trip: props.trip
    }
  }

  updateTripName(e) {
        const trip = this.state.trip;
        trip.tripName = e.target.value;

      this.setState({
        trip: trip
      });
  }

  updateTripDescription(e) {
        const trip = this.state.trip;
        trip.tripDescription = e.target.value;

      this.setState({
        trip: trip
      });
  }

  handleUpdate(e){
    const trip = this.state.trip;
    console.log(this.state.current_user);
    e.preventDefault();
    if(trip){
    axios.put(`http://localhost:3001/api/v1/trips/${trip.id}`, trip: trip, {
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
      this.props.onUpdate(this.state.trip)
    }

  renderForm() {
    if(this.state.trip) {
      console.log("trip:");
      console.log(this.state.trip);
      console.log("trip id:");
      console.log(this.state.trip.id);
      console.log("current_user:");
      console.log(this.state.current_user);
      return (
        <div>
          <form onSubmit={(e) => this.handleUpdate(e)} className='form-layout' onClick={this.update.bind(this)} >
              <input type='text' value={this.state.trip.tripName} onChange={this.updateTripName.bind(this)} />
              <input type='textarea' value={this.state.trip.tripDescription} onChange={this.updateTripDescription.bind(this)} />
              <input type='submit' value='Save Changes' />
          </form>
        </div>
      );
    }
  }


  render() {
    console.log(this.state.trip);
    return (
      <div>
        {this.renderForm()}
      </div>
    );
  }
}

export default TripUpdate;
