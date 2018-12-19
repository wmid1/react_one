import React, { Component } from 'react';
import './Header.css';
import PropTypes from 'prop-types';
import PopUpStart from './popUpStart';
import ChangeName from './ChangeName';

class Header extends Component {
  state = {
    value: '',
    update: false,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    const username = localStorage.getItem('username');
    if (username !== null || undefined) {
      this.state = { username };
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ username: this.state.value });
    localStorage.setItem('username', this.state.value);
  }

  resetTitle = evt => {
    evt.preventDefault();
    this.setState({ username: undefined });
    localStorage.removeItem('username');
  };

  update = value => {
    this.setState({ username: value });
  };

  render() {
    const username = this.state.username;
    const handleSubmit = this.handleSubmit;
    const onChange = this.handleChange;
    const handleExit = this.resetTitle;
    const updateData = this.props.updateData;
    function PopUp() {
      if (username === undefined) {
        return (
          <form className="form-inline" onSubmit={handleSubmit}>
            <input
              className="form-control "
              type="text"
              name="user"
              pattern=".{3,}"
              required
              placeholder="Your name"
              value={username}
              onChange={onChange}
            />
            <button className="btn btn-primary ml-2 ">Log In</button>
          </form>
        );
      }
      if (username != null || undefined) {
        return (
          <div>
            <button className="btn btn-secondary" onClick={handleExit}>
              Log Out
            </button>
          </div>
        );
      }
    }
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-brand">{username}</div>
          {PopUp()}
          <ChangeName updateData={updateData} />
        </nav>
        ﻿
        <PopUpStart update={this.update} />
      </div>
    );
  }
}
Header.propTypes = {
  updateData: PropTypes.func,
};
export default Header;
