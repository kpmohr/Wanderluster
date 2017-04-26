import React, { Component } from 'react';
import '../stylesheets/App.css';
import translatorData from '../translatorData';
import axios from 'axios';
import ToggleDisplay from 'react-toggle-display';


class Translator extends Component {

  constructor() {
    super();
    this.state = {
      textInput: '',
      languageOne: null,
      languageTwo: null,
      answerText: '',
      translatorData: translatorData,
      show: false
    }
  }

  handleChangeOne(e) {
    this.setState({
      languageOne: e.target.value
    })
  }

  languageListOne(){
    return this.state.translatorData.map((language,index) => {
      return (
        <option key={index} value={language.value} onChange={(e) =>this.handleChangeOne(e)}>
          {language.label}
        </option>
        )
    });
  }

  handleChangeTwo(e) {
    this.setState({
      languageTwo: e.target.value
    })
  }

  languageListTwo(){
    return this.state.translatorData.map((language,index) => {
      return (
        <option key={index} value={language.value}>
          {language.label}
        </option>
        )
    });
  }

  searchInput(e){
    this.setState({
      textInput: e.target.value
    })
  }

  searchSubmit(e){
    e.preventDefault()
    console.log(this.state.textInput);
    console.log(this.state.languageOne);
    console.log(this.state.languageTwo);
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?text=${this.state.textInput}&lang=${this.state.languageOne}-${this.state.languageTwo}&key= trnsl.1.1.20170419T211236Z.22ac2d78ba1191a8.628da0f6ffc13fcabdb8b8fd95d877452fbdd4f5`;

    console.log(url);

    axios.get(url)
      .then((res) =>{
        console.log(res.data.text);
        const newText = res.data.text;
        const answer = (newText);
        console.log(answer);
        this.setState({
          answerText: answer
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
    return(
      <div className='sub-div'>
        <div className='center'>
          <div onClick={() => this.handleClick()} className='hexagon'>
            <span>
              <div className='button-toggle'>New Catch Phrase?
                <div className='small-text'>(Translator)</div>
              </div>
            </span>
        </div>
        </div>
        <ToggleDisplay show={this.state.show}  className='hexagonBig'>
          <div className='div-toggle'>
            <div className='title'>Translator</div>
            <form className='currency-form' onSubmit={(e)=> this.searchSubmit(e)}>
              <textarea type='text' placeholder='Add Text' onChange={(e) =>this.searchInput(e)} />
              <label>Your Language:</label>
              <select label='Your Text' onChange={(e) =>this.handleChangeOne(e)} value={this.state.value}>
                {this.languageListOne()}
              </select>
              <label>Language You Need:</label>
              <select label='Translation' onChange={(e) =>this.handleChangeTwo(e)} value={this.state.value}>
                {this.languageListTwo()}
              </select>
              <input type='submit' value='Translate' />
            </form>
            <div className='answer'>{this.state.answerText}</div>
          </div>
        </ToggleDisplay>
      </div>
      )
  }
}


export default Translator;
