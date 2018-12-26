import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addBtn, addQuant } from '../../actions/ColAction';
// resolve(this.props.addBtnAction())
class ButtonSet extends Component {
  onBtnClick = () => {
    this.props.addBtnAction();
    this.props.addQuantAction();
  };

  render() {
    return (
      <div>
        <button className="btn btn-secondary ml-2 op mt-2 wth" onClick={this.onBtnClick}>
          Add Column +
        </button>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    columnNames: store.columnNames,
  };
}

const mapDispatchToProps = dispatch => ({
  addBtnAction: () => dispatch(addBtn()),
  addQuantAction: () => dispatch(addQuant()),
});

ButtonSet.propTypes = {
  update: PropTypes.func,
  addBtnAction: PropTypes.func.isRequired,
  addQuantAction: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ButtonSet);
