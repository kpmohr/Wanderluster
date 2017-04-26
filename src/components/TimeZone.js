import React, { Component } from 'react';
import '../stylesheets/App.css';
import timezoneData from '../timezoneData';
import axios from 'axios';
import Time from 'react-time';
import moment from 'moment';
import ToggleDisplay from 'react-toggle-display';


class TimeZone extends Component {

  constructor() {
    super();
    this.state = {
      now: null,
      fromTime: null,
      toTime: null,
      unicode: null,
      answerTime: null,
      timezoneData: timezoneData,
      show: false
    }
  }

  componentDidMount(){
    const now = new Date();
    const unicodeNow = moment(now).unix();
    console.log(unicodeNow);
    this.setState({
      now: unicodeNow
    })
  }

  handleChangeFrom(e) {
    this.setState({
      fromTime: e.target.value
    })
  }

  timezoneFrom(){
    return this.state.timezoneData.map((timezone,index) => {
      return (
        <option key={index} onChange={(e) =>this.handleChangeFrom(e)} value={timezone.zoneName}>
          {timezone.zoneName}
        </option>
        )
    });
  }

  handleChangeTo(e) {
    this.setState({
      toTime: e.target.value
    })
  }

  timezoneTo(){
    return this.state.timezoneData.map((timezone,index) => {
      return (
        <option key={index} onChange={(e) =>this.handleChangeTo(e)} value={timezone.zoneName}>
          {timezone.zoneName}
        </option>
        )
    });
  }

  searchSubmit(e){
    e.preventDefault()

    console.log(this.state.toTime);
    console.log(this.state.fromTime);
    console.log(this.state.now);
    const urlTime = `http://api.timezonedb.com/v2/convert-time-zone?key=5F18ZOQ4XW4E&format=json&from=${this.state.fromTime}&to=${this.state.toTime}&time=${this.state.now}`;

    console.log(urlTime);

    axios.get(urlTime)
      .then((res) =>{
        const newTime = res.data.toTimestamp;
        console.log(newTime);
        const answer = moment(newTime).format("hh:mma MM/DD/YYYY");
        console.log(answer);
        this.setState({
          answerTime: answer
        })
      })
      .catch((error)=>{
      console.log('error: ', error)
    })
  }

  handleClick() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    // const timezoneNow = moment.tz.names();
    // console.log(timezoneNow);
    let now = moment().unix();
    console.log(now);
    return(
      <div className='sub-div' >
        <div className='center'>
          <div onClick={() => this.handleClick()} className='hexagon'>
            <span>
              <div className='button-toggle'>Need to Call Mom?
                <div className='small-text'>(Time Zones)</div>
              </div>
            </span>
          </div>
        </div>
        <ToggleDisplay show={this.state.show} className='hexagonBig'>
          <div className='div-toggle'>
            <div>
              <div className='title'>Your Time:</div>
              <div className='title'><Time value={now} format="hh:mma MM/DD/YYYY" /></div>
            </div>
            <div>
              <form onSubmit={(e)=> this.searchSubmit(e)} className='timezone-form' >
                <label>Your Time Zone:</label>
                <select label='Your Time Zone' onChange={(e) =>this.handleChangeFrom(e)}>
                  {this.timezoneFrom()}
                </select>
                <label>Time Zone You Need:</label>
                <select label='Time Zone You Need' onChange={(e) =>this.handleChangeTo(e)} >
                  {this.timezoneTo()}
                </select>
                <input type='submit' value='Find Time' />
              </form>
            </div>
            <div className='answer'>{this.state.answerTime}</div>
          </div>
        </ToggleDisplay>
      </div>
      )
  }
}


export default TimeZone;
