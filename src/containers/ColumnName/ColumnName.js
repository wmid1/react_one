import '../../App.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setColName } from '../../actions/ColAction';

class ColumnName extends Component {
  reNameCol = event => {
    const { columnNameId } = this.props;
    const indexCol = this.props.columnArr.findIndex(obj => obj.id === columnNameId);
    const valueCol = event.target.value;
    this.props.setColNameAction(valueCol, indexCol);
  };

  render() {
    const { columnNameId, lock } = this.props;
    const indexCol = this.props.columnArr.findIndex(obj => obj.id === columnNameId);
    if (!lock) {
      return (
        <input
          id={columnNameId}
          onBlur={this.reNameCol}
          type="text"
          className=" nameInput inputName_unLock form-control-sm mt-1 mb-1 "
          defaultValue={this.props.columnArr[indexCol].columnName}
          placeholder="Column name"
        />
      );
    }

    if (this.props.columnArr[indexCol].columnName === '') {
      return (
        <input
          id={columnNameId}
          onBlur={this.reNameCol}
          type="text"
          className="nameInput inputName_lock form-control-sm mt-1 mb-1"
          placeholder="Column name"
        />
      );
    }

    return (
      <div className="columnNameId">
        <b>{this.props.columnArr[indexCol].columnName}</b>
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
  setColNameAction: (indexCol, valueCol) => dispatch(setColName(indexCol, valueCol)),
});
ColumnName.propTypes = {
  lock: PropTypes.bool,
  columnNameId: PropTypes.string,
  columnArr: PropTypes.array,
  setColNameAction: PropTypes.func.isRequired,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColumnName);
