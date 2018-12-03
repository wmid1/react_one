import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import './App.css'
import Macushka from './components/Macushka'
import ButtonSet from './components/buttonSet'
import Card from './components/card'


class App extends Component {
  state = {
    lock: true,
    update: false,
    value: ''
  }

  constructor(props) {
    super(props);
    if (JSON.parse(localStorage.getItem("numbers")) === null || undefined) {
    localStorage.setItem("numbers", JSON.stringify([1,2,3,4]));
    localStorage.setItem("butId", ("[]"));
    localStorage.setItem("1name", "TODO")
    localStorage.setItem("2name", "In Progress")
    localStorage.setItem("3name", "Testing")
    localStorage.setItem("4name", "Done")
    }
  }

  update = (value) =>{
    this.setState({ update:  value})
  }

  updateData = (value) =>{
    this.setState({lock: value})
  }

  delCard = (butId, evt) =>{
    this.setState({ lock:  false  })
    let numbers =JSON.parse(localStorage.getItem("numbers"));
    let butsId =JSON.parse(localStorage.getItem("butId"));
    let storedbutsId = Array.from(butsId);
    let storedNumbers = Array.from(numbers);
    let delName = storedNumbers.splice(storedNumbers.indexOf(Number(butId)), 1);
    storedbutsId.push(butId);
    if (this.state.lock!==true) {
      localStorage.setItem("butId", ("[" + storedbutsId + "]"));
      localStorage.setItem("numbers", ("[" + storedNumbers + "]"));
      localStorage.removeItem(Number(delName));
      localStorage.removeItem(delName+"name");
      localStorage.removeItem("array_"+butId);
    }
  }

  cardName = (cardNameId, evn) =>{
    if (document.getElementById(cardNameId).value !== "") {
      this.setState({ update:  true})
      localStorage.setItem(cardNameId, document.getElementById(cardNameId).value)
    }
  }

  render() {
  const lock = this.state.lock;
  const numbers = JSON.parse(localStorage.getItem("numbers"));
  const delCard = this.delCard;
  const cardName = this.cardName;
  const update = this.update;

  function CardName(props) {
    const cardNameId = props.cardNameId;
    if (lock!==true) {
      return(
        <input id={cardNameId} onBlur={evn => cardName(cardNameId)}
        type="text" className="form-control form-control-sm " defaultValue={localStorage.getItem(cardNameId)} placeholder="Название формы"/>
      );
    }
      if (localStorage.getItem(cardNameId) == null || undefined || '') {
       return(
         <input id={cardNameId} onBlur={evn => cardName(cardNameId)}
         type="text" className="form-control form-control-sm " placeholder="Название формы"/>
       );
     }
    return(
      <div className="cardNameId">
        <b>{localStorage.getItem(cardNameId)}</b>
      </div>
     )
  }

  function DelCard(props) {
    const butId = props.butId;
      if (lock!==true) {
        return (
          <button className="close ml-2 mb-1" aria-label="Close"  onClick={evt => delCard(butId)}>
            <span aria-hidden="true" >&times;</span>
          </button>
        );
      }
      return null
  }

  function NumberList(props) {
    const numbers = props.numbers;
      const listItems = numbers.map((number) =>
        <div className="bg-card text-white rounded ml-2 mt-2 mb-2" key={number.toString()} id={number.toString()} >
          <div className="cardName  form-control-sm">
            <CardName cardNameId={number.toString()+'name'}/>
            <DelCard butId={number.toString()}/>
          </div>
          <Card cardId={number.toString()} update={update} lock={lock}/>
        </div>
        );
    return (
      <div id="line" className="form-inline line ">
        {listItems}
      </div>
        );
  }
return (
  <div className="container-fluid p-0" >
    <Macushka updateData={this.updateData}/>
    <div className="form-inline p-1 line line-1">
      <NumberList numbers={numbers} />
      <ButtonSet update={this.update}/>
    </div>
  </div>
        );
      }
}

export default App;
