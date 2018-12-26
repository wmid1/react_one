import React, { Component } from 'react';
import './Header.css';
import PropTypes from 'prop-types';

class ChangeName extends Component {
  state = {
    changeSetting: false,
  };

  changeSetting = () => {
    this.setState({ changeSetting: true });
    this.props.updateData(false);
  };

  saveSetting = () => {
    this.setState({ changeSetting: false });
    this.props.updateData(true);
  };

  update = value => {
    this.setState({ username: value });
  };

  render() {
    const { changeSetting, saveSetting } = this;
    const changeSettingState = this.state.changeSetting;

    if (!changeSettingState) {
      return (
        <button className="btn btn-secondary ml-2" onClick={changeSetting}>
          Edit
        </button>
      );
    }
    return (
      <button className="btn btn-primary ml-2" onClick={saveSetting}>
        Save
      </button>
    );
  }
}

ChangeName.propTypes = {
  updateData: PropTypes.func,
};

export default ChangeName;
