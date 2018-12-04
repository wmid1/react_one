import React, { Component } from 'react';
import './popUpStart.css'
class PopUpStart extends Component {
  state = {
    value: ''
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

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    this.setState({ username: this.state.value });
    localStorage.setItem("username", this.state.value);
    console.log(this.state.value);
    localStorage.setItem("start", false)
    this.props.update(this.state.update=this.state.value);
  }

  render() {
    let handleSubmit = this.handleSubmit;
    let onChange = this.handleChange;
    let username  = this.state.username;
    function StartName() {

      if (JSON.parse(localStorage.getItem("start")) === true) {
        return (
          <div className="startWindow">
            <form className="startWindow_content" onSubmit={handleSubmit}>
              <h4><b>Добро пожаловать!</b></h4>
              <input className="form-control rounded mb-1 mt-3" type="text" name="user"
              pattern=".{3,}"
              required
              placeholder="Ваше имя"
              value={username}
              onChange={onChange}/>
              <button className="btn btn-primary mt-2 ">
                Запомнить
              </button>
            </form>
          </div>
        );
      }
        return null
    }

    return (
      <div>
        {StartName()}
      </div>
    );
  }

}
export default PopUpStart;
