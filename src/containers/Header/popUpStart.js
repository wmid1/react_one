import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUsername, startEnd } from '../../actions/ColAction';
import './popUpStart.css';

class PopUpStart extends Component {
  state = {
    value: '',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = () => {
    const username = this.state.value;
    this.props.setUserAction(username);
    this.props.startEndAction();
    this.setState({ value: '' });
    this.props.update(this.state.value);
  };

  render() {
    if (this.props.params.start) {
      return (
        <div className="startWindow">
          <div className="startWindow_content">
            <h4>
              <b>Welcome!</b>
            </h4>
            <input
              className="form-control rounded mb-1 mt-3"
              type="text"
              name="user"
              pattern=".{3,}"
              required
              placeholder="Your name"
              value={this.state.username}
              onChange={this.handleChange}
            />
            {this.state.value !== '' && (
              <button className="btn btn-secondary mt-2 " onClick={this.handleSubmit}>
                Log In
              </button>
            )}
          </div>
        </div>
      );
    }
    return null;
  }
}
function mapStateToProps(store) {
  return {
    params: store.params,
  };
}
const mapDispatchToProps = dispatch => ({
  setUserAction: username => dispatch(setUsername(username)),
  startEndAction: () => dispatch(startEnd()),
});

PopUpStart.propTypes = {
  params: PropTypes.object,
  setUserAction: PropTypes.func.isRequired,
  startEndAction: PropTypes.func.isRequired,
  update: PropTypes.func,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PopUpStart);
