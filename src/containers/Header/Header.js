import React, { Component } from 'react';
import './Header.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUsername } from '../../actions/ColAction';
import PopUpStart from './popUpStart';
import ChangeName from './ChangeName';

class Header extends Component {
  state = {
    value: '',
    update: false,
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = () => {
    const username = this.state.value;
    this.props.setUserAction(username);
    this.setState({ update: true });
    this.setState({ value: '' });
  };

  resetTitle = () => {
    this.setState({ username: '' });
    this.props.setUserAction('');
  };

  update = value => {
    this.setState({ username: value });
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-brand">{this.props.userReducer.username}</div>
          {this.props.userReducer.username === '' && (
            <div className="form-inline">
              <input
                className="form-control "
                type="text"
                name="user"
                pattern=".{3,}"
                required
                placeholder="Your name"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <button className="btn btn-primary ml-2 " onClick={this.handleSubmit}>
                Log In
              </button>
            </div>
          )}

          {this.props.userReducer.username !== '' && (
            <div>
              <button className="btn btn-secondary" onClick={this.resetTitle}>
                Log Out
              </button>
            </div>
          )}

          <ChangeName updateData={this.props.updateData} />
        </nav>

        <PopUpStart update={this.update} />
      </div>
    );
  }
}
function mapStateToProps(store) {
  return {
    userReducer: store.userReducer,
  };
}
const mapDispatchToProps = dispatch => ({
  setUserAction: username => dispatch(setUsername(username)),
});
Header.propTypes = {
  updateData: PropTypes.func,
  setUserAction: PropTypes.func,
  userReducer: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
