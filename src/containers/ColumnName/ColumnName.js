import '../../App.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setColName } from '../../actions/ColAction';

class ColumnName extends Component {
  reNameCol = event => {
    const { columnNameId } = this.props;
    const valueCol = event.target.value;
    this.props.setColNameAction(valueCol, columnNameId);
  };

  render() {
    const { columnNameId, lock } = this.props;
    if (!lock) {
      return (
        <input
          onBlur={this.reNameCol}
          type="text"
          className=" nameInput inputName_unLock form-control-sm mt-1 mb-1 "
          defaultValue={this.props.columnArr.find(a => a.id === columnNameId).columnName}
          placeholder="Column name"
        />
      );
    }

    if (this.props.columnArr.find(a => a.id === columnNameId).columnName === '') {
      return (
        <input
          onBlur={this.reNameCol}
          type="text"
          className="nameInput inputName_lock form-control-sm mt-1 mb-1"
          placeholder="Column name"
        />
      );
    }

    return (
      <div className="columnNameId">
        <b>{this.props.columnArr.find(a => a.id === columnNameId).columnName}</b>
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
  setColNameAction: (columnNameId, valueCol) => dispatch(setColName(columnNameId, valueCol)),
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
