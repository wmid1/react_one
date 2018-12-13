import React, { Component } from 'react';
import './App.css'
import Header from './components/Header/Header'
import ButtonSet from './components/ButtonSet/ButtonSet'
import DelColumn from './components/DelColumn/DelColumn'
import ColumnName from './components/ColumnName/ColumnName'
import Column from './components/Column/Column'
import PopUpCard from './components/Column/PopUpCard'

class App extends Component {
  state = {
    lock: true,
    update: false,
    value: '',
    modalIsOpen: false,
    colIsOpen: undefined,
    cardIsOpen: undefined
  }

  constructor(props) {
    super(props);
    if (JSON.parse(localStorage.getItem("numbers")) === null || undefined) {
    localStorage.setItem("numbers", JSON.stringify([1,2,3,4]));
    localStorage.setItem("columnId", ("[]"));
    localStorage.setItem("1name", "TODO")
    localStorage.setItem("2name", "In Progress")
    localStorage.setItem("3name", "Testing")
    localStorage.setItem("4name", "Done")
    localStorage.setItem("start", true)
    }
  }

  modalChangeOpen = (value) =>{
    this.setState({ modalIsOpen: value})
  }
  colChangeOpen = (value) =>{
    this.setState({ colIsOpen: value})
  }
  cardChangeOpen = (value) =>{
    this.setState({ cardIsOpen: value})
  }

  update = (value) =>{
    this.setState({ update:  value})
  }

  updateData = (value) =>{
    this.setState({lock: value})
  }

  render() {
  const {lock, modalIsOpen, colIsOpen, cardIsOpen } = this.state;
  const {modalChangeOpen, colChangeOpen, cardChangeOpen, update} = this;
  const numbers = JSON.parse(localStorage.getItem("numbers"));
  const popUp = (
    <PopUpCard
      update={update}
      columnId={colIsOpen}
      cardId={cardIsOpen}
      modalIsOpen={modalIsOpen}
      modalChangeOpen={modalChangeOpen}
    />
  )
  function NumberList(props) {
    const numbers = props.numbers;
      const listItems = numbers.map((number) =>
        <div className="bg-card text-white rounded ml-2 mt-2 mb-2" key={number.toString()} id={number.toString()} >
          <div className="columnName  form-control-sm">
            <ColumnName
              columnNameId={number.toString()+'name'}
              lock={lock}
            />
            <DelColumn
              columnId={number.toString()}
              update={update}
              lock={lock}
            />
          </div>
          <Column
            columnId={number.toString()}
            update={update}
            lock={lock}
            modalIsOpen={modalIsOpen}
            modalChangeOpen={modalChangeOpen}
            colIsOpen={colIsOpen}
            cardIsOpen={cardIsOpen}
            colChangeOpen={colChangeOpen}
            cardChangeOpen={cardChangeOpen}

          />
        </div>
        );
    return (
      <div id="line" className="form-inline line ">
        {listItems}
        {popUp}
      </div>
    );
  }
return (
  <div className="container-fluid p-0" >
    <Header updateData={this.updateData}/>
    <div className="form-inline p-1 line line-1">
      <NumberList numbers={numbers} />
      <ButtonSet update={this.update}/>
    </div>

  </div>
    );
  }
}

export default App;
