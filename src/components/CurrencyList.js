import React, { Component } from 'react';
import '../stylesheets/App.css';
import currencyData from '../currencyData';

class CurrencyList extends Component {

  constructor() {
    super();
    this.state = {
      currencyData: currencyData
    }
  }

  handleClick() {
    this.props.whenItemClicked(this.props.item);
  }

  render() {
    return <li>
      <a onClick={this.handleClick}>{this.props.item}</a></li>
  }
});

export default CurrencyList;
