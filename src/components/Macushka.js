import React, { Component } from 'react';
import './Macushka.css'
import PopUpStart from './popUpStart'

class Macushka extends Component {
  state = {
    changeSetting: false,
    value: '',
    update: false,
  }
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    let username = localStorage.getItem("username");
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
    this.setState({changeSetting: true})
    this.props.updateData(this.state.lock=false);
    //localStorage.setItem("lock", false)
  }
  saveSetting = evt =>{
    this.setState({changeSetting: false})
    this.props.updateData(this.state.lock=true);
  }
  update = (value) =>{
    this.setState({ username:  value})
  }

render() {
  let username  = this.state.username;
  let handleSubmit = this.handleSubmit;
  let onChange = this.handleChange;
  let handleExit = this.resetTitle;
  const update = this.update;
  function PopUp() {
    if (username === undefined) {
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
        return(
        <div>
          <button className="btn btn-secondary" onClick={handleExit}>
            Выйти
          </button>
        </div>
    )}
  }
  let changeSetting = this.changeSetting;
  let saveSetting = this.saveSetting;
  const changeSettingState = this.state.changeSetting;

  function ChangeName() {
    let button = "button";
    if (changeSettingState !== true) {
      return(
        <button className="btn btn-secondary ml-2" onClick={changeSetting}>
          Редактировать
        </button>
      )
    }
    return(
      <button className="btn btn-primary ml-2" onClick={saveSetting}>
        Сохранить
      </button>
    )
  }

    return (
      <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand" >{username}</a>
          {PopUp()}
          {ChangeName()}
      </nav>﻿
        <PopUpStart update={this.update}/>
      </div>
    )
  }
}

export default Macushka;
