import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addColumn } from '../../actions/ColAction';

class ButtonSet extends Component {
  onBtnClick = () => {
    this.props.addColumnAction();
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
    columnArr: store.columnArr,
  };
}

const mapDispatchToProps = dispatch => ({
  addColumnAction: () => dispatch(addColumn()),
});

ButtonSet.propTypes = {
  addColumnAction: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ButtonSet);
