import React, { Component } from 'react';
import './Macushka.css'

class Macushka extends Component {
  state = {
    changeSetting: false,

  }
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    var username = localStorage.getItem("username");
    console.log(username);
    if (username !== null || undefined) {
      this.state = {username: username}
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({ username: this.state.value });
    localStorage.setItem("username", this.state.value);
  }
   resetTitle = evt => {
    evt.preventDefault();
    this.setState({ username: undefined });
    localStorage.removeItem("username");
  }
    changeSetting = evt =>{
      this.setState({changeSetting: false})
      this.props.updateData(this.state.lock=false);
    }
    saveSetting = evt =>{
      this.setState({changeSetting: true})
      this.props.updateData(this.state.lock=true);

    }
  /*
}*/
render() {
  var username  = this.state.username;
  console.log(username);
  var handleSubmit = this.handleSubmit;
  var onChange = this.handleChange;
  var handleExit = this.resetTitle;
  function PopUp() {
    if (username == null || undefined) {
      return (
        <form className = "form-inline" onSubmit={handleSubmit}>
        <input className="form-control " type="text" name="user"
        pattern=".{3,}"
        required
        placeholder="Ваше имя"
        value={username}
        onChange={onChange} />
        <button className="btn btn-primary ml-2 ">
          Запомнить
          </button>

        </form>
    )}
      else if (username != null || undefined) {
        return(<div>
        <button className="btn btn-secondary" onClick={handleExit}>
          Выйти
          </button>
        </div>
    )}
        ;}
  var changeSetting = this.changeSetting;
  var saveSetting = this.saveSetting;
  var changeSettingState = this.state.changeSetting;
  function ChangeName() {
    if (changeSettingState == false) {
      return(
        <button className="btn btn-primary ml-2" onClick={saveSetting}>
          Сохранить
          </button>

      )
    }
    return(
      <button className="btn btn-secondary ml-2" onClick={changeSetting}>
        Редактировать
        </button>
    )
  }

    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
         <a className="navbar-brand" >{username}</a>
            {PopUp()}
            {ChangeName()}
      </nav>﻿
           );
         }
}

export default Macushka;
