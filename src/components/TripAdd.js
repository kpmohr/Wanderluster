import React, { Component } from 'react';
import axios from 'axios';


class TripAdd extends Component {

  constructor(props){
    super(props);
    this.state = {
      current_user: props.current_user,
      tripName: '',
      tripDescription: '',
      trip: null
    }
  }

  updateTripName(e) {
        const tripName = e.target.value;

      this.setState({
        tripName: tripName
      });
  }

  updateTripDescription(e) {
      const tripDescription = e.target.value;

      this.setState({
        tripDescription: tripDescription
      });
  }

  handleAdd(e){
    e.preventDefault();
    const trip = {tripName: this.state.tripName,
                  tripDescription: this.state.tripDescription,
                  user_id: this.state.current_user}
    if(trip){
    axios.post(`http://localhost:3001/api/v1/trips`, trip: trip, {
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
      this.props.onAdd(this.state.trip)
    }

  renderForm() {
      console.log("trip name:");
      console.log(this.state.tripName);
      console.log("trip description:");
      console.log(this.state.tripDescription);
      console.log("current_user:");
      console.log(this.state.current_user);
      return (
        <div>
          <form onSubmit={(e) => this.handleAdd(e)} className='form-layout'  onClick={this.update.bind(this)} >
              <input type='text' value={this.state.tripName} onChange={this.updateTripName.bind(this)} placeholder='Add Trip Name' />
              <input type='textarea' value={this.state.tripDescription} onChange={this.updateTripDescription.bind(this)} placeholder='Add Trip Description' />
              <input type='submit' value='Add Trip' />
          </form>
        </div>
      );
  }


  render() {
    return (
      <div>
        {this.renderForm()}
      </div>
    );
  }
}

export default TripAdd;
