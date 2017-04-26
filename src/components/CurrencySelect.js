import React, { Component } from 'react';
import '../stylesheets/App.css';
import SelectBox from 'react-select-box';
import currencyData from '../currencyData';

class CurrencySelect extends Component {

  constructor() {
    super();
    this.state = {
      currencyInput: null,
      countryOne: null,
      countryTwo: null,
      currencyData: currencyData
    }
  }

  handleChange(e) {
    this.setState({
      countryOne: e.target.value
    })
  }

  countryList(){
    return this.state.currencyData.map((country,index) => {
      return (
        <option key={index} value={country.value} onChange={(e) =>this.searchInput(e)}>
          {country.label}
        </option>
        )
    });
  }

  render() {
    console.log(this.state.currencyData);
    return(
      <div>
        <h1>Select A Currency</h1>
        <SelectBox label='Currency'>
          {this.countryList()}
        </SelectBox>
      </div>
      )
  }
}


export default CurrencySelect;
