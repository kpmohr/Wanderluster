import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import ToggleDisplay from 'react-toggle-display';
import TripUpdate from './TripUpdate';
import TripAdd from './TripAdd';


class Trip extends Component {

  constructor(props){
    super(props);
    this.state = {
      trips: [],
      trip: null,
      current_user: props.current_user,
      show: false,
      showAdd: false,
      showUpdate: false
    }
  }

  onAdd(data) {
    console.log(data);
      if(data) {
      this.forceUpdate();
    }
  }

  onUpdate(data) {
    console.log(data);
      if(data) {
      this.forceUpdate();
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


  addTrip() {
    return (
      <div>
        <input type="submit" value="Add A Trip!" onClick={() => this.handleClickAdd()} />
        <ToggleDisplay show={this.state.showAdd} >
          <TripAdd current_user={this.state.current_user} onAdd={this.onAdd.bind(this)} />
        </ToggleDisplay>
      </div>
          );
  }

deleteTrip(id){
  console.log(id);
    axios.delete(`http://localhost:3001/api/v1/trips/${id}`, {
      data: {
        id: id
      }
    }).then((response)=>{
      console.log('success', response);
      this.forceUpdate();
    }).catch((error) =>{
      console.log('error: ', error)
    })
  };

  handleTrips(trips){
    console.log(trips);

    if(this.state.trips){
      return this.state.trips.map((trip, index) => {
            console.log(trip.user_id);
            console.log(this.state.current_user);
        if(trip.user_id === this.state.current_user){
          console.log(trip);
        return (
        <div>
          <div key={index} value={trip.id}><strong>{trip.tripName}</strong>&mdash;{trip.tripDescription}
          </div>
          <div className='buttons-trips'>
            <div>
              <input type="submit" value="Update your trip?" onClick={() => this.handleClickUpdate()} />
              <ToggleDisplay show={this.state.showUpdate} >
                <TripUpdate trip={trip} onUpdate={this.onUpdate.bind(this)} />
              </ToggleDisplay>
            </div>
            <div><input type='submit' onClick={()=>this.deleteTrip(trip.id)} value='Delete this trip!?' /></div>
          </div>
        </div>
        )
      } return null;
      })
    } else {
      return (
        <div className='trip-div'>
          <p>No Trips Yet!</p>
        </div>
        )
    }
  }

  handleClick() {
    this.setState({
      show: !this.state.show
    });
  }

  handleClickAdd() {
    this.setState({
      showAdd: !this.state.showAdd
    });
  }

  handleClickUpdate() {
    this.setState({
      showUpdate: !this.state.showUpdate
    });
  }

  render(){
    console.log(this.state.trips);
    // console.log(this.state.trips);
    return(
      <div className='sub-div'>
        <div className='center'>
          <div onClick={() => this.handleClick()} className='hexagon'>
            <span>
              <div className='button-toggle'>Make It Happen!
                <div className='small-text'>(Trip Info)</div>
              </div>
            </span>
          </div>
        </div>
        <ToggleDisplay show={this.state.show} className='hexagonBig'>
          <div className='title'>Trip Information</div>
          <div>
            {this.handleTrips(this.state.trips)}
          </div>
          <div>
            {this.addTrip()}
          </div>
        </ToggleDisplay>
      </div>
    )
  }
}

export default Trip;
