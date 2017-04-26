import React, { Component } from 'react';
import '../stylesheets/App.css';
import currencyData from '../currencyData';
import axios from 'axios';
import ToggleDisplay from 'react-toggle-display';
import getSymbol from 'currency-symbol-map';

class Currency extends Component {

  constructor() {
    super();
    this.state = {
      currencyInput: '',
      countryOne: null,
      countryTwo: null,
      lang: null,
      symbol: null,
      answer: '',
      currencyData: currencyData,
      show: false
    }
  }

  handleChangeOne(e) {
    this.setState({
      countryOne: e.target.value
    })
  }

  countryListOne(){
    return this.state.currencyData.map((country,index) => {
      return (
        <option key={index} value={country.value} onChange={(e) =>this.handleChangeOne(e)}>
          {country.label}
        </option>
        )
    });
  }

  handleChangeTwo(e) {
    this.setState({
      countryTwo: e.target.value
    })
  }

  countryListTwo(){
    return this.state.currencyData.map((country,index) => {
      return (
        <option key={index} value={country.value}>
          {country.label}
        </option>
        )
    });
  }

  searchInput(e){
    this.setState({
      currencyInput: e.target.value
    })
  }

  searchSubmit(e){
    e.preventDefault()
    console.log(this.state.currencyInput);
    console.log(this.state.countryOne);
    console.log(this.state.countryTwo);
    const url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%3D%22${this.state.countryOne}${this.state.countryTwo}%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`;

    console.log(url);

    axios.get(url)
      .then((res) =>{
        console.log(res.data.query.results.rate.Rate);
        console.log(res.data.query.lang);
        const lang = res.data.query.lang;
        const rate = res.data.query.results.rate.Rate;
        console.log(rate);
        const answer = (rate * this.state.currencyInput).toFixed(2);
        console.log(answer);
        console.log(this.state.countryTwo)
        const symbol = this.state.countryTwo;
        const symbolFinal = getSymbol(symbol);
        console.log(symbolFinal);

        this.setState({
          answer: answer,
          symbol: symbolFinal,
          lang: lang
        })
      })
      .catch((error)=>{
      console.log('error: ', error)
    })
  }

  // handleSymbol() {
  //   if(this.state.symbol === '?') {
  //     this.setState({
  //         symbol: ''
  //       })
  //       } else {
  //       return this.state.symbol;
  //     }
  //   }
  // }

  handleClick() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    return(
      <div className='sub-div' >
        <div className='center'>
          <div onClick={() => this.handleClick()} className='hexagon'>
            <span>
              <div className='button-toggle'>Worth It?
                <div className='small-text'>(Currency Rates)</div>
              </div>
            </span>
          </div>
        </div>
        <ToggleDisplay show={this.state.show} className='hexagonBig'>
          <span>
            <div className='div-toggle'>
              <div className='title' >Currency Exchange</div>
              <div>
                <form className='currency-form' onSubmit={(e)=> this.searchSubmit(e)} >
                  <input type='text' placeholder='Add Amount $$' onChange={(e) =>this.searchInput(e)} />
                    <label>Currency You Have:</label>
                    <select onChange={(e) =>this.handleChangeOne(e)} value={this.state.value}>
                      {this.countryListOne()}
                    </select>
                  <label>Currency You Need:</label>
                  <select onChange={(e) =>this.handleChangeTwo(e)} value={this.state.value}>
                    {this.countryListTwo()}
                  </select>
                  <input type='submit' value='Convert' />
                </form>
              </div>
              <div  className='answer'>{this.state.symbol}{this.state.answer}</div>
            </div>
          </span>
        </ToggleDisplay>
      </div>
      )
  }
}


export default Currency;
